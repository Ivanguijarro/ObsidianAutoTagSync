import { Plugin, TFile } from "obsidian";

export default class AutoTagSync extends Plugin {
  async onload() {
    console.log("Auto Tag Sync Plugin loaded");

    // Escucha los cambios en las notas abiertas
    this.registerEvent(
      this.app.workspace.on("file-open", async (file) => {
        if (file instanceof TFile && file.path.endsWith(".md")) {
          await this.syncTags(file);
        }
      })
    );

    // Escucha los cambios de contenido mientras escribes
    this.registerEvent(
      this.app.vault.on("modify", async (file) => {
        if (file instanceof TFile && file.path.endsWith(".md")) {
          await this.syncTags(file);
        }
      })
    );
  }

  // Función para sincronizar las tags
  async syncTags(file: TFile) {
    await this.delay(10000);
    const fileContent = await this.app.vault.read(file);

    // Separar frontmatter y contenido
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = fileContent.match(frontmatterRegex);

    let frontmatter = match ? match[1] : "";
    let body = match ? fileContent.replace(frontmatterRegex, "") : fileContent;

    // Detectar tags en el contenido
    const tagsInBody = Array.from(new Set(body.match(/#\w+/g)?.map((tag: string) => tag.slice(1)) || []));

    // Parsear el frontmatter
    const frontmatterLines = frontmatter.split("\n").filter((line) => line.trim() !== "");
    let tagsInFrontmatter = frontmatterLines.find((line) => line.startsWith("tags:"));
    let updatedFrontmatter = "";

    if (tagsInFrontmatter) {
      // Si ya hay una línea "tags:", actualízala
      tagsInFrontmatter = tagsInFrontmatter.replace(/^tags:\s*\[?(.*?)\]?\s*$/, (_, tags) => {
        const existingTags = tags.split(",").map((tag: string) => tag.trim());
        const mergedTags = Array.from(new Set([...existingTags, ...tagsInBody]));
        return `tags: [${mergedTags.join(", ")}]`;
      });
    } else if (tagsInBody.length > 0) {
      // Si no hay línea "tags:", agrégala
      tagsInFrontmatter = `tags: [${tagsInBody.join(", ")}]`;
    }

    // Reconstruir el frontmatter
    updatedFrontmatter = frontmatterLines
      .map((line) => (line.startsWith("tags:") ? tagsInFrontmatter : line))
      .join("\n");

    if (!frontmatterLines.some((line) => line.startsWith("tags:")) && tagsInBody.length > 0) {
      updatedFrontmatter = `${updatedFrontmatter}\ntags: [${tagsInBody.join(", ")}]`;
    }

    // Crear el nuevo contenido del archivo
    const newContent = `---\n${updatedFrontmatter}\n---\n${body.trim()}`;

    // Solo escribir si hay cambios
    if (fileContent.trim() !== newContent.trim()) {
      await this.app.vault.modify(file, newContent);
      console.log(`Tags synchronized in ${file.path}`);
    }
  }

  // Añade retraso para crear el tag en el frontmatter
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onunload() {
    console.log("Auto Tag Sync Plugin unloaded");
  }
}

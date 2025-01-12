# Auto Tag Sync Plugin for Obsidian

**Auto Tag Sync** is an Obsidian plugin that automatically synchronizes tags between the content of your notes and the frontmatter. It ensures that all tags (e.g., `#exampleTag`) used in the body of a note are reflected in the frontmatter, and vice versa.

## Features

- Automatically adds tags to the frontmatter when they appear in the note content.
- Removes tags from the frontmatter if they are completely removed from the note content.
- Works in real-time as you write or edit notes.
- Adds a configurable delay before synchronizing, avoiding unnecessary operations during frequent edits.

## How It Works

1. When you add a tag (e.g., `#example`) in the body of a note, the plugin updates the frontmatter to include it.
2. If all instances of a tag are deleted from the note content, the plugin automatically removes it from the frontmatter.
3. Ensures the frontmatter remains consistent with the content of the note.


## Configuration

The plugin includes a built-in delay of 10 seconds before synchronizing tags. This ensures that frequent edits do not trigger unnecessary updates.

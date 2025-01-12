"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var obsidian_1 = require("obsidian");
var AutoTagSync = /** @class */ (function (_super) {
    __extends(AutoTagSync, _super);
    function AutoTagSync() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoTagSync.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("Auto Tag Sync Plugin loaded");
                // Escucha los cambios en las notas abiertas
                this.registerEvent(this.app.workspace.on("file-open", function (file) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(file instanceof obsidian_1.TFile && file.path.endsWith(".md"))) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.syncTags(file)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); }));
                // Escucha los cambios de contenido mientras escribes
                this.registerEvent(this.app.vault.on("modify", function (file) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(file instanceof obsidian_1.TFile && file.path.endsWith(".md"))) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.syncTags(file)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); }));
                return [2 /*return*/];
            });
        });
    };
    // Función para sincronizar las tags
    AutoTagSync.prototype.syncTags = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent, frontmatterRegex, match, frontmatter, body, tagsInBody, frontmatterLines, tagsInFrontmatter, updatedFrontmatter, newContent;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.delay(10000)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 2:
                        fileContent = _b.sent();
                        frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
                        match = fileContent.match(frontmatterRegex);
                        frontmatter = match ? match[1] : "";
                        body = match ? fileContent.replace(frontmatterRegex, "") : fileContent;
                        tagsInBody = Array.from(new Set(((_a = body.match(/#\w+/g)) === null || _a === void 0 ? void 0 : _a.map(function (tag) { return tag.slice(1); })) || []));
                        frontmatterLines = frontmatter.split("\n").filter(function (line) { return line.trim() !== ""; });
                        tagsInFrontmatter = frontmatterLines.find(function (line) { return line.startsWith("tags:"); });
                        updatedFrontmatter = "";
                        if (tagsInFrontmatter) {
                            // Si ya hay una línea "tags:", actualízala
                            tagsInFrontmatter = tagsInFrontmatter.replace(/^tags:\s*\[?(.*?)\]?\s*$/, function (_, tags) {
                                // Obtener las etiquetas existentes en el frontmatter
                                var existingTags = tags.split(",").map(function (tag) { return tag.trim(); });
                                // Filtrar etiquetas que siguen presentes en el contenido del archivo
                                var updatedTags = existingTags.filter(function (tag) { return tagsInBody.includes(tag); });
                                // Agregar nuevas etiquetas que aparezcan en el cuerpo y no estén en el frontmatter
                                for (var _i = 0, tagsInBody_1 = tagsInBody; _i < tagsInBody_1.length; _i++) {
                                    var tag = tagsInBody_1[_i];
                                    if (!updatedTags.includes(tag)) {
                                        updatedTags.push(tag);
                                    }
                                }
                                // Devolver las etiquetas actualizadas
                                return "tags: [".concat(updatedTags.join(", "), "]");
                            });
                        }
                        else if (tagsInBody.length > 0) {
                            // Si no hay línea "tags:", agrégala
                            tagsInFrontmatter = "tags: [".concat(tagsInBody.join(", "), "]");
                        }
                        // Reconstruir el frontmatter
                        updatedFrontmatter = frontmatterLines
                            .map(function (line) { return (line.startsWith("tags:") ? tagsInFrontmatter : line); })
                            .join("\n");
                        if (!frontmatterLines.some(function (line) { return line.startsWith("tags:"); }) && tagsInBody.length > 0) {
                            updatedFrontmatter = "".concat(updatedFrontmatter, "\ntags: [").concat(tagsInBody.join(", "), "]");
                        }
                        newContent = "---\n".concat(updatedFrontmatter, "\n---\n").concat(body.trim());
                        if (!(fileContent.trim() !== newContent.trim())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.app.vault.modify(file, newContent)];
                    case 3:
                        _b.sent();
                        console.log("Tags synchronized in ".concat(file.path));
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Añade retraso para crear el tag en el frontmatter
    AutoTagSync.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    AutoTagSync.prototype.onunload = function () {
        console.log("Auto Tag Sync Plugin unloaded");
    };
    return AutoTagSync;
}(obsidian_1.Plugin));
exports.default = AutoTagSync;

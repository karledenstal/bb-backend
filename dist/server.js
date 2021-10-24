"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_safe_1 = require("dotenv-safe");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const db_1 = __importDefault(require("./config/db"));
async function main() {
    (0, dotenv_safe_1.config)();
    const app = (0, express_1.default)();
    const port = process.env.PORT || 8080;
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)({ limit: "100kb" }));
    await (0, db_1.default)();
    app.listen(port, () => {
        console.log("🚀 Take off on", port);
    });
}
main().catch((e) => console.error('init error', e));
//# sourceMappingURL=server.js.map
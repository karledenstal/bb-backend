"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/bb');
        console.log("💾 Connected to mongo");
    }
    catch (e) {
        console.error("Mongo db couldn't connect", e);
    }
};
exports.default = connect;
//# sourceMappingURL=db.js.map
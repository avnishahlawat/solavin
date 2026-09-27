"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../generated/prisma");
let PrismaService = PrismaService_1 = class PrismaService extends prisma_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(PrismaService_1.name);
        this.isConnected = false;
    }
    async onModuleInit() {
        if (!process.env.DATABASE_URL) {
            this.logger.warn('DATABASE_URL is not set. SOLAVIN running with pure in-memory state.');
            return;
        }
        try {
            await this.$connect();
            this.isConnected = true;
            this.logger.log('Successfully connected to PostgreSQL database via Prisma.');
        }
        catch (error) {
            this.logger.warn(`Could not connect to PostgreSQL database: ${error.message}. Continuing with in-memory persistence.`);
            this.isConnected = false;
        }
    }
    async onModuleDestroy() {
        if (this.isConnected) {
            await this.$disconnect();
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map
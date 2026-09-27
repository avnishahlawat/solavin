import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    isConnected: boolean;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}

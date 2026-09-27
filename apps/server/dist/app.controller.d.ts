export declare class AppController {
    getHealth(): {
        status: string;
        service: string;
        timestamp: string;
    };
    getThemes(): import("@solavin/shared").Theme[];
}

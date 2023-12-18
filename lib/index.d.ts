import { Context, Schema } from 'koishi';
export declare const name = "galwife";
export declare const usage = "\n\u83DC\u5C31\u591A\u604B\uFF0C\u8C08\u4E0D\u8D77\u5C31\u522B\u8C08\u3002\n\n\u4E0D\u662F\u59B9\u59B9\u8FFD\u4E0D\u8D77,\u800C\u662F\u4E8C\u6B21\u5143\u66F4\u6709\u6027\u4EF7\u6BD4\u3002\n";
export interface Config {
    标明出处: boolean;
    随机祝福: boolean;
    每日轮换: boolean;
}
export declare const Config: Schema<Config>;
declare module 'koishi' {
    interface Tables {
        galgamewife: Galgamewife;
    }
}
export interface Galgamewife {
    id: number;
    user_time: string;
    user_id: string;
    user_wife: string;
    wife_game: string;
}
export declare function apply(ctx: Context, config: Config): Promise<void>;

import { Context, Schema } from 'koishi';
export declare const name = "galwife";
export declare const usage = "\n# <center>\uD83E\uDD80\u83DC\u5C31\u591A\u604B\uFF0C\u8C08\u4E0D\u8D77\u5C31\u522B\u8C08\uD83E\uDD80</center>\n\n# <center>\u4E0D\u662F\u59B9\u59B9\u8FFD\u4E0D\u8D77\uD83E\uDD21 \u800C\u662F\u4E8C\u6B21\u5143\u66F4\u6709\u6027\u4EF7\u6BD4\uD83E\uDD24</center>\n\n# <center>\u5F00\u7BB1\u5373\u7528\uFF0C\u50BB\u74DC\u914D\u7F6E\uFF0C\u7ACB\u5373\u53F3\u4E0A\u89D2\u542F\u7528\u63D2\u4EF6\uD83D\uDE0B</center>\n\n\u9AD8\u7EA7\u529F\u80FD\u4F7F\u7528\u4F8B\uFF1A\u56FE\u7247\u76EE\u5F55\u586B\u5165\uFF1A./wives   \u2014\u2014\u8BFB\u53D6koishi\u6839\u76EE\u5F55\u4E0B\u7684wives\u6587\u4EF6\u5939\uFF08win\u5C06\u659C\u6760\u6539\u6210\u53CD\u659C\u6760\uFF09\u3002\n\n\u56FE\u7247JSON\u586B\u5165\uFF1A./wife.json   \u2014\u2014\u8BFB\u53D6koishi\u6839\u76EE\u5F55\u4E0B\u7684wife.json\u6587\u4EF6\uFF08win\u5C06\u659C\u6760\u6539\u6210\u53CD\u659C\u6760\uFF09\u3002\n\n\u5BFC\u5165\u7684JSON\u683C\u5F0F\u4E3A\uFF1A{\"key1\": [\"value1\",\"value2\",\"value3\"],\"key2\": [\"value4\",\"value5\",\"value6\"]}\n\n\u2014\u2014\u5176\u4E2Dkey\u4E3A\u51FA\u5904\uFF0Cvalue\u4E3A\u89D2\u8272\u540D\u3002\u56FE\u7247\u6587\u4EF6\u540D\u9700\u4E0E\u89D2\u8272\u540D\u76F8\u5BF9\u5E94\u3002\n\n\u653E\u4E2Azbp\u7684wife\u4ED3\u5E93\uFF0C\u4F60\u5E94\u8BE5\u61C2\u6211\u610F\u601D\u5427~~\uFF08\u6539\u6539json\u5C31\u80FD\u4E22\u8FDB\u53BB\u7528\u4E86\uFF09\n\n<a>https://github.com/FloatTech/zbpwife/tree/b92443d3d4337613528ce073a1250f02201c0777</a>\n\n\uFF08\u81EA\u5B9A\u4E49\u5E93\u662F\u603B\u5F00\u5173\uFF0C\u53EA\u6709\u5F00\u542F\u8DEF\u5F84\u624D\u6709\u6548\u3002\u4E0D\u662Fbug\uFF0C\u53EA\u662F\u56E0\u4E3A\u83DC\u4E0D\u4F1A\u5199\u7F62\u4E86\uFF0C\u4E0D\u5F71\u54CD\u4F7F\u7528\uFF09\n";
export interface Config {
    标明出处: boolean;
    随机祝福: boolean;
    概率计算: boolean;
    输出模式: boolean;
    每日轮换: boolean;
    自定义库: boolean;
    图片目录: string;
    图片JSON: string;
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

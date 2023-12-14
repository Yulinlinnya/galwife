import { Context, Schema, h } from 'koishi'
const path = require('path');

export const name = 'galwife'

export const usage = `
菜就多恋，谈不起就别谈。

不是妹妹追不起,而是二次元更有性价比。
`

export interface Config {
  标明出处: boolean;
  随机祝福: boolean;
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    标明出处: Schema.boolean().default(false).description('※传播造成不良后果本人概不负责'),
    随机祝福: Schema.boolean().default(true).description('※随机一句祝福语句'),
  }).description('普通设置'),
]);

export async function apply(ctx: Context, config: Config) {
    ctx.command('galwife').action(async ({ session }, ...args) => {

        const inori = ["ご結婚おめでとうございます！","お二人の末永い健康とご多幸をお祈りいたします。","心よりお祝い申し上げます。","お二人の人生最良の門出を、心からお喜び申し上げます。"];

        const namae = {"ジュエリー・ハーツ・アカデミア -We will wing wonder world-": ["アリアンナ","ベルカ・トリアーデ","メア・アシュリーペッカー","ルビイ"],"ゆまほろめ　時を停めた館で明日を探す迷子たち": ["ミーナ","柴田奏子","川崎純麗","岩沼鈴"],"もののあはれは彩の頃。": ["クレア・コートニー・クレア","鬼無水みさき","琥珀","野々宮京楓"],"さくら、もゆ。-as the Night's, Reincarnation-": ["クロ","杏藤千和","夜月姫織","柊ハル"],"縁りて此の葉は紅に": ["斑鳩和羽","稜未小乃葉","木那里もみじ","笹浦すずな"],"さくらの雲＊スカアレットの恋": ["メリッサ","不知出遠子","水神蓮","所長"],"ふゆから、くるる。": ["熾火澱","菊間塔子","空丘夕陽","霜雪しほん","水名とりねこ","星都チエミ","宇賀島ベルリン","宇賀島ユカリ","月角島ヴィカ"],"まどひ白きの神隠し": ["稲白みこと","高乃椎凪","九十九千代","土御ろか"],"ねこツク、さくら。": ["ツキ","久慈恋花","上路弥生","穂高文乃"],"11月のアルカディア": ["三刀屋瀬奈","星崎心音","野々宮楓花","羽鳥愛瑠"],"あなたに恋する恋愛ルセット": ["白咲美絵瑠","大園柚姫","鍵由楓花","橘ののか"],"アンレス・テルミナリア": ["りな","ルチア＝ヴァリニャーノ","橘シャロン","御厨恋"],"ソラコイ": ["アイリ","ソラ","ナミ","ヒカリ"],"ハミダシクリエイティブ": ["常磐華乃","和泉妃愛","錦あすみ","鎌倉詩桜"],"保健室のセンセーとゴスロリの校医": ["オトヒメ"],"保健室のセンセーとシャボン玉中毒の助手": ["シロバナ"],"保健室のセンセーと小悪魔な会長": ["月森鈴"],"ネコ神さまと、ななつぼし -妹の姉-": ["青葉英梨歌"],"鍵を隠したカゴのトリ-Bird in cage hiding the key-": ["孔雀石透子","青葉梟みおん","瑞葉伊鶴","燕沢夜"],"空の青と白と／瞬きの夏": ["桧ノ原つぼみ"],"恋想リレーション": ["アリサ・ガーランド","千石唯華","桜坂由羽子","御厨陽葵"],"青い空のカミュ": ["オオモトサマ","三間坂蛍","込谷燐"],"若葉色のカルテット": ["アイ","ソフィア・クーゲル・ウェストリン","峰岸都","守谷ひより"]};

        let randomgame = Object.keys(namae)[Math.floor(Math.random() * Object.keys(namae).length)];
        let randomname = namae[randomgame][Math.floor(Math.random() * namae[randomgame].length)];
        let randominori = inori[Math.floor(Math.random() * inori.length)];

        let Path = path.join(path.resolve(__dirname, 'data'),randomname);
        let imagePath = 'file://' + Path + '.jpg';

        if (config.标明出处) {
          if (config.随机祝福) {await session.send('あなたの嫁さんは「' + randomgame+'」の「' + randomname + '」ございます。' + randominori);await session.send(h.image(imagePath));}
          else{await session.send('あなたの嫁さんは「' + randomgame + '」の「' + randomname + '」ございます。');await session.send(h.image(imagePath));}
        }
        else{
          if (config.随机祝福) {await session.send('あなたの嫁さんは「' + randomname + '」ございます。' + randominori);await session.send(h.image(imagePath));}
          else{await session.send('あなたの嫁さんは「' + randomname + '」ございます。');await session.send(h.image(imagePath));}
        }
    })
}
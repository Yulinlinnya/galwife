//逻辑很混乱，没有参考性。
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
  每日轮换: boolean;
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    标明出处: Schema.boolean().default(false).description('※传播造成不良后果本人概不负责'),
    随机祝福: Schema.boolean().default(true).description('※随机一句祝福语句'),
  }).description('普通功能'),
  Schema.object({
    每日轮换: Schema.boolean().default(true).description('※绑定用户和老婆每日刷新'),
  }).description('扩展功能'),
]);

declare module 'koishi' {
  interface Tables {
    galgamewife: Galgamewife
  }
}

export interface Galgamewife {
  id: number
  user_time: string
  user_id: string
  user_wife: string
  wife_game: string
}

export async function apply(ctx: Context, config: Config) {
    //创建数据库
  ctx.database.extend("galgamewife", {
    id: 'unsigned',
    user_time: 'string',
    user_id: 'string',
    user_wife: 'string',
    wife_game: 'string',
  });

  //祝福
  const blessing = ["ご結婚おめでとうございます！","お二人の末永い健康とご多幸をお祈りいたします。","心よりお祝い申し上げます。","お二人の人生最良の門出を、心からお喜び申し上げます。"];
  //名字
  const wife_name = {"ジュエリー・ハーツ・アカデミア -We will wing wonder world-": ["アリアンナ","ベルカ・トリアーデ","メア・アシュリーペッカー","ルビイ"],"ゆまほろめ　時を停めた館で明日を探す迷子たち": ["ミーナ","柴田奏子","川崎純麗","岩沼鈴"],"もののあはれは彩の頃。": ["クレア・コートニー・クレア","鬼無水みさき","琥珀","野々宮京楓"],"さくら、もゆ。-as the Night's, Reincarnation-": ["クロ","杏藤千和","夜月姫織","柊ハル"],"縁りて此の葉は紅に": ["斑鳩和羽","稜未小乃葉","木那里もみじ","笹浦すずな"],"さくらの雲＊スカアレットの恋": ["メリッサ","不知出遠子","水神蓮","所長"],"ふゆから、くるる。": ["熾火澱","菊間塔子","空丘夕陽","霜雪しほん","水名とりねこ","星都チエミ","宇賀島ベルリン","宇賀島ユカリ","月角島ヴィカ"],"まどひ白きの神隠し": ["稲白みこと","高乃椎凪","九十九千代","土御ろか"],"ねこツク、さくら。": ["ツキ","久慈恋花","上路弥生","穂高文乃"],"11月のアルカディア": ["三刀屋瀬奈","星崎心音","野々宮楓花","羽鳥愛瑠"],"あなたに恋する恋愛ルセット": ["白咲美絵瑠","大園柚姫","鍵由楓花","橘ののか"],"アンレス・テルミナリア": ["りな","ルチア＝ヴァリニャーノ","橘シャロン","御厨恋"],"ソラコイ": ["アイリ","ソラ","ナミ","ヒカリ"],"ハミダシクリエイティブ": ["常磐華乃","和泉妃愛","錦あすみ","鎌倉詩桜"],"保健室のセンセーとゴスロリの校医": ["オトヒメ"],"保健室のセンセーとシャボン玉中毒の助手": ["シロバナ"],"保健室のセンセーと小悪魔な会長": ["月森鈴"],"ネコ神さまと、ななつぼし -妹の姉-": ["青葉英梨歌"],"鍵を隠したカゴのトリ-Bird in cage hiding the key-": ["孔雀石透子","青葉梟みおん","瑞葉伊鶴","燕沢夜"],"空の青と白と／瞬きの夏": ["桧ノ原つぼみ"],"恋想リレーション": ["アリサ・ガーランド","千石唯華","桜坂由羽子","御厨陽葵"],"青い空のカミュ": ["オオモトサマ","三間坂蛍","込谷燐"],"若葉色のカルテット": ["アイ","ソフィア・クーゲル・ウェストリン","峰岸都","守谷ひより"]};

  ctx.command('galwife','娶二次元老婆').alias('/galwife').action(async ({ session }) => {
    //随机老婆
    let random_game = Object.keys(wife_name)[Math.floor(Math.random() * Object.keys(wife_name).length)];
    let random_name = wife_name[random_game][Math.floor(Math.random() * wife_name[random_game].length)];
    let game_string = "「" + random_game + "」の";
    let game_name = config.标明出处 ? game_string : "";

    //随机祝福
    let random_blessing = config.随机祝福 ? blessing[Math.floor(Math.random() * blessing.length)] : "";

    //获取图片路径
    let Path = path.join(path.resolve(__dirname, 'data'),random_name);
    let imagePath = 'file://' + Path + '.jpg';

    if (config.每日轮换) {
      //一些变量
      let user_id = session.userId;
      const user_data = await ctx.database.get("galgamewife", { user_id });
      const user_datas = await ctx.database.get("galgamewife", {});
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const date = currentDate.getDate();
      const user_Time = `${year}-${month}-${date}`;

      //判断用户是否存在
      if (user_data.length == 0) {
        //用户不存在，创建用户并随机老婆
        await ctx.database.create("galgamewife", { id: user_datas.length + 1, user_time: user_Time, user_id: user_id, user_wife: random_name, wife_game:random_game});

        await session.send(`<at id={session.userId} />あなたの嫁さんは${game_name}「${random_name}」ございます。${random_blessing}`)
        await session.send(h.image(imagePath))
      }
      else {
        //用户存在，判断上传时间
        if (user_data?.[0]?.user_time == user_Time) {
          //时间正确，重婚
          const user_Wife = (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.user_wife;
          const wife_Game = config.标明出处 ? "「" + (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.wife_game + "」の" : "";

          //获取用户老婆路径
          let user_Path = path.join(path.resolve(__dirname, 'data'),user_Wife);
          let user_imagePath = 'file://' + user_Path + '.jpg';

          await session.send( `<at id={session.userId} />スケベ!奥さんがいたのに！奥さんは${wife_Game}「${user_Wife}」、次は許さないぞ！`);
          await session.send(h.image(user_imagePath));
        }
        else {
          //时间错误，重新选择
          await ctx.database.set("galgamewife", { user_id: user_id }, { user_time: user_Time, user_wife: random_name, wife_game:random_game});
          const user_Wife = (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.user_wife;
          const wife_Game = config.标明出处 ? "「" + (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.wife_game + "」の" : "";

          //获取用户老婆路径
          let user_Path = path.join(path.resolve(__dirname, 'data'),user_Wife);
          let user_imagePath = 'file://' + user_Path + '.jpg';

          await session.send( `<at id={session.userId} />あなたの嫁さんは${wife_Game}「${user_Wife}」ございます。${random_blessing}`);
          await session.send(h.image(user_imagePath));
        }
      }
    }
    else {
      await session.send( `<at id={session.userId} />あなたの嫁さんは${game_name}「${random_name}」ございます。${random_blessing}`);
      await session.send(h.image(imagePath))
    }
  })
}
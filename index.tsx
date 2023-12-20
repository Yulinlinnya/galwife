//逻辑很混乱，没有参考性。
import { Context, Schema, h } from 'koishi'

const path = require('path');
const fs = require('fs');

export const name = 'galwife'

export const usage = `
# <center>🦀菜就多恋，谈不起就别谈🦀</center>

# <center>不是妹妹追不起🤡 而是二次元更有性价比🤤</center>

高级功能使用例：图片目录填入：./wife   ——读取koishi根目录下的wife文件夹（win将斜杠改成反斜杠）。

图片JSON填入：./namae.json   ——读取koishi根目录下的namae.json文件（win将斜杠改成反斜杠）。

导入的JSON格式为：{"key1": ["value1","value2","value3"],"key2": ["value4","value5","value6"]}

——其中key为出处，value为角色名。图片文件名需与角色名相对应。

（自定义库是总开关，只有开启路径才有效。不是bug，只是因为菜不会写罢了，不影响使用）
`

export interface Config {
  标明出处: boolean;
  随机祝福: boolean;
  输出模式: boolean;
  每日轮换: boolean;
  自定义库: boolean;
  图片目录: string;
  图片JSON: string;
}

export const Config: Schema<Config> = Schema.intersect([
  Schema.object({
    标明出处: Schema.boolean().default(false).description('※传播造成不良后果，那种事不要啊(;´༎ຶД༎ຶ`)'),
    随机祝福: Schema.boolean().default(true).description('※随机一句祝福语句，开宴席能带咱吗(╹ڡ╹ )'),
    输出模式: Schema.boolean().default(false).description('※开启为图文混合，关闭为分开发送。很实用呢（＾∀＾●）ﾉｼ'),
  }).description('普通功能'),
  Schema.object({
    每日轮换: Schema.boolean().default(true).description('※记录每日与她的邂逅(✿◠‿◠)'),
  }).description('扩展功能'),
  Schema.object({
    自定义库: Schema.boolean().default(false).description('**☢不会使用请勿开启☢** 允许添加自己的老婆(○｀ 3′○)'),
    图片目录: Schema.string().description('**※文件夹的路径※** 向好友分享你自己的老婆库(/▽＼)'),
    图片JSON: Schema.string().description('**※JSON文件的路径※** 记录你和你老婆的相遇(★ ω ★)'),
  }).description('高级功能'),
])

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
  //建表
  ctx.model.extend("galgamewife", {
    id: 'unsigned',
    user_time: 'string',
    user_id: 'string',
    user_wife: 'string',
    wife_game: 'string',
  });

  const blessing = ["ご結婚おめでとうございます！","お二人の末永い健康とご多幸をお祈りいたします。","心よりお祝い申し上げます。","お二人の人生最良の門出を、心からお喜び申し上げます。"];
  const my_wife_name = {"ジュエリー・ハーツ・アカデミア -We will wing wonder world-": ["アリアンナ","ベルカ・トリアーデ","メア・アシュリーペッカー","ルビイ"],"ゆまほろめ　時を停めた館で明日を探す迷子たち": ["ミーナ","柴田奏子","川崎純麗","岩沼鈴"],"もののあはれは彩の頃。": ["クレア・コートニー・クレア","鬼無水みさき","琥珀","野々宮京楓"],"さくら、もゆ。-as the Night's, Reincarnation-": ["クロ","杏藤千和","夜月姫織","柊ハル"],"縁りて此の葉は紅に": ["斑鳩和羽","稜未小乃葉","木那里もみじ","笹浦すずな"],"さくらの雲＊スカアレットの恋": ["メリッサ","不知出遠子","水神蓮","所長"],"ふゆから、くるる。": ["熾火澱","菊間塔子","空丘夕陽","霜雪しほん","水名とりねこ","星都チエミ","宇賀島ベルリン","宇賀島ユカリ","月角島ヴィカ"],"まどひ白きの神隠し": ["稲白みこと","高乃椎凪","九十九千代","土御ろか"],"ねこツク、さくら。": ["ツキ","久慈恋花","上路弥生","穂高文乃"],"11月のアルカディア": ["三刀屋瀬奈","星崎心音","野々宮楓花","羽鳥愛瑠"],"あなたに恋する恋愛ルセット": ["白咲美絵瑠","大園柚姫","鍵由楓花","橘ののか"],"アンレス・テルミナリア": ["りな","ルチア＝ヴァリニャーノ","橘シャロン","御厨恋"],"ソラコイ": ["アイリ","ソラ","ナミ","ヒカリ"],"ハミダシクリエイティブ": ["常磐華乃","和泉妃愛","錦あすみ","鎌倉詩桜"],"保健室のセンセーとゴスロリの校医": ["オトヒメ"],"保健室のセンセーとシャボン玉中毒の助手": ["シロバナ"],"保健室のセンセーと小悪魔な会長": ["月森鈴"],"ネコ神さまと、ななつぼし -妹の姉-": ["青葉英梨歌"],"鍵を隠したカゴのトリ-Bird in cage hiding the key-": ["孔雀石透子","青葉梟みおん","瑞葉伊鶴","燕沢夜"],"空の青と白と／瞬きの夏": ["桧ノ原つぼみ"],"恋想リレーション": ["アリサ・ガーランド","千石唯華","桜坂由羽子","御厨陽葵"],"青い空のカミュ": ["オオモトサマ","三間坂蛍","込谷燐"],"若葉色のカルテット": ["アイ","ソフィア・クーゲル・ウェストリン","峰岸都","守谷ひより"]};

  //导入用户json
  function getnamejson() {
    if(config.自定义库) {
      const user_wife_data = fs.readFileSync(config.图片JSON,'utf8');
      const user_wife_name = JSON.parse(user_wife_data);
      console.log("读取到JOSN文件，并在日志打印确认（key）：" +Object.keys(user_wife_name));
      //合并my_wife_name和user_wife_name
      const wife_name = {...my_wife_name,...user_wife_name};
      return wife_name;
    }
    else{
      const wife_name = my_wife_name;
      return wife_name;
    }
  }

  function getImagepath(random_name) {
    if (Object.values(my_wife_name).flat().includes(random_name)) {
      //如果是我的老婆，则读取data目录，我只用jpg
      const Path = 'file://' + path.join(path.resolve(__dirname, 'data'),random_name) + '.jpg';
      return Path;
    }
    else{
      //如果是用户的老婆，则读取用户的目录，用户后缀未知
      // 获取当前目录下的所有文件
      const files = fs.readdirSync(config.图片目录, 'utf8');
      // 遍历文件列表，找到目标文件
      const targetFile = files.find(file => file.startsWith(random_name));
        // 获取文件的绝对路径
      const Path = 'file://' + path.resolve(__dirname, targetFile);
      console.log("读取到图像文件："+ path.resolve(__dirname, targetFile));
      return Path;
    }
  }

  const wife_name = getnamejson();

  ctx.command('galwife','娶二次元老婆').alias('/galwife').action(async ({ session }) => {
    //随机老婆
    let random_game = Object.keys(wife_name)[Math.floor(Math.random() * Object.keys(wife_name).length)];
    let random_name = wife_name[random_game][Math.floor(Math.random() * wife_name[random_game].length)];
    let game_string = "「" + random_game + "」の";
    let game_name = config.标明出处 ? game_string : "";
    //随机祝福
    let random_blessing = config.随机祝福 ? blessing[Math.floor(Math.random() * blessing.length)] : "";

    if (config.每日轮换) {
      //亿些变量
      const user_id = session.userId;
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
        if (config.输出模式) {session.send(h.image(getImagepath(random_name)) + `<at id={session.userId} />あなたの嫁さんは${game_name}「${random_name}」ございます。${random_blessing}`);}
        else {await session.send(`<at id={session.userId} />あなたの嫁さんは${game_name}「${random_name}」ございます。${random_blessing}`);await session.send(h.image(getImagepath(random_name)));}}
      else {
        //用户存在，判断上传时间
        if (user_data?.[0]?.user_time == user_Time) {
          //时间正确，重婚
          const user_Wife = (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.user_wife;
          const wife_Game = config.标明出处 ? "「" + (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.wife_game + "」の" : "";
          if (config.输出模式) {await session.send(h.image(getImagepath(user_Wife)) + `<at id={session.userId} />スケベ！奥さんがいたのに！奥さんは${wife_Game}「${user_Wife}」、次は許さないわ！`);}
          else {await session.send( `<at id={session.userId} />スケベ！奥さんがいたのに！奥さんは${wife_Game}「${user_Wife}」、次は許さないわ！`);await session.send(h.image(getImagepath(user_Wife)));}}
        else {
          //时间错误，重新选择
          await ctx.database.set("galgamewife", { user_id: user_id }, { user_time: user_Time, user_wife: random_name, wife_game:random_game});
          const user_Wife = (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.user_wife;
          const wife_Game = config.标明出处 ? "「" + (await ctx.database.get("galgamewife", { user_id: user_id }))[0]?.wife_game + "」の" : "";
          if (config.输出模式) {await session.send(h.image(getImagepath(user_Wife)) + `<at id={session.userId} />あなたの嫁さんは${wife_Game}「${user_Wife}」ございます。${random_blessing}`);}
          else {await session.send( `<at id={session.userId} />あなたの嫁さんは${wife_Game}「${user_Wife}」ございます。${random_blessing}`);await session.send(h.image(getImagepath(user_Wife)));}}
      }
    }
    else {
      if (config.输出模式) {await session.send(h.image(getImagepath(random_name)) + `<at id={session.userId} />あなたの嫁さんは${game_name}「${random_name}」ございます。${random_blessing}`);}
      else {await session.send( `<at id={session.userId} />あなたの嫁さんは${game_name}「${random_name}」ございます。${random_blessing}`);await session.send(h.image(getImagepath(random_name)))}
    }
  })
}
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "最愛的火鍋",
    options: ["青花驕", "詹記", "馬辣", "泰滾"],
    correctAnswer: "詹記",
  },
  {
    id: 2,
    question: "沒做過的事",
    options: [
      "發紅包給王董",
      "在便利商店整理貨架",
      "路邊撿垃圾",
      "罵路邊抽菸的人",
    ],
    correctAnswer: "發紅包給王董",
  },
  {
    id: 3,
    question: "狗派貓派",
    options: ["狗", "貓"],
    correctAnswer: "貓",
  },
  {
    id: 4,
    question: "吉伊卡哇沒有收娃的角色",
    options: ["栗子大叔", "小八", "獅薩", "海獺師傅"],
    correctAnswer: "獅薩",
  },
  {
    id: 5,
    question: "甜點帳號名字",
    options: ["月光馬卡", "月光馬卡龍", "月光卡龍", "月光戰士"],
    correctAnswer: "月光馬卡",
  },
  {
    id: 6,
    question: "最喜歡ㄉ飲料",
    options: [
      "不夜侯-503鮮乳茶",
      "約翰紅茶-雨果那提",
      "Mateas-Mateas茶王鮮奶茶",
      "壽奶茶-半熟烤糖鮮奶茶",
      "上宇林-熊貓鮮奶茶",
      "一沐日-蕎麥茶加粉粿",
      "大茗-烤糖蕎麥凍奶青",
    ],
    correctAnswer: "壽奶茶-半熟烤糖鮮奶茶",
  },
  {
    id: 7,
    question: "去年生日派對表演的歌",
    options: ["Hype Boy", "Whiplash", "Love Dive", "OMG"],
    correctAnswer: "OMG",
  },
  {
    id: 8,
    question: "目前任職的公司",
    options: ["東南旅遊", "可樂旅遊", "五福旅遊", "雄獅旅遊"],
    correctAnswer: "雄獅旅遊",
  },
  {
    id: 9,
    question: "今年春酒抽到什麼獎品",
    options: ["iPad mini", "即期茶包", "可樂", "住宿券", "日本來回機票"],
    correctAnswer: "即期茶包",
  },
  {
    id: 10,
    question: "轉職班上的是",
    options: ["TibaMe", "資策會", "聯強", "AppWorks"],
    correctAnswer: "TibaMe",
  },
  {
    id: 11,
    question: "今年幾歲",
    options: ["27", "28", "29", "30"],
    correctAnswer: "28",
  },
  {
    id: 12,
    question: "月光馬卡沒有賣過的甜點",
    options: ["提拉米蘇", "可麗露", "生日糕", "馬卡龍"],
    correctAnswer: "提拉米蘇",
  },
  {
    id: 13,
    question: "大學學級",
    options: ["B03", "B04", "B05", "B06"],
    correctAnswer: "B04",
  },
  {
    id: 14,
    question: "大學主修",
    options: ["外語系", "外文系", "英語系", "英文系"],
    correctAnswer: "外文系",
  },
  {
    id: 15,
    question: "大學主修",
    options: ["韓文系", "中文系", "日文系", "外文系"],
    correctAnswer: "外文系",
  },
  {
    id: 16,
    question: "官方認證的口頭禪",
    options: ["沒被打過", "好想回家", "什麼意思", "勸你善良"],
    correctAnswer: "好想回家",
  },
  {
    id: 17,
    question: "寫的框架",
    options: ["Angular", "React", "Vue"],
    correctAnswer: "React",
  },
  {
    id: 18,
    question: "生日當天內褲穿什麼顏色",
    options: ["黑色", "紫色", "綠色", "藍色"],
    correctAnswer: "綠色",
  },
  {
    id: 19,
    question: "沒有喜歡過ㄉ IP",
    options: ["吉伊卡哇", "三麗鷗", "卡娜赫拉", "多拉A夢"],
    correctAnswer: "卡娜赫拉",
  },
  {
    id: 20,
    question: "學測數學幾級分",
    options: ["8", "9", "10", "11"],
    correctAnswer: "8",
  },  
];

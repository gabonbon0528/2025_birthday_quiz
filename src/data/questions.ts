export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "2025年農曆新年是幾月幾日？",
    options: ["2月9日", "2月10日", "2月11日", "2月12日"],
    correctAnswer: "2月10日"
  },
  {
    id: 2,
    question: "2025年是哪個生肖年？",
    options: ["龍年", "蛇年", "馬年", "羊年"],
    correctAnswer: "蛇年"
  },
  {
    id: 3,
    question: "2025年農曆新年的生肖動物是？",
    options: ["龍", "蛇", "馬", "羊"],
    correctAnswer: "蛇"
  },
  {
    id: 4,
    question: "2025年農曆新年的生肖動物在十二生肖中排第幾？",
    options: ["第5位", "第6位", "第7位", "第8位"],
    correctAnswer: "第6位"
  },
  {
    id: 5,
    question: "2025年農曆新年的生肖動物在五行中屬什麼？",
    options: ["金", "木", "水", "火"],
    correctAnswer: "火"
  },
  {
    id: 6,
    question: "2025年農曆新年的生肖動物在十二地支中對應什麼？",
    options: ["巳", "午", "未", "申"],
    correctAnswer: "巳"
  },
  {
    id: 7,
    question: "2025年農曆新年的生肖動物在十二地支中排第幾？",
    options: ["第5位", "第6位", "第7位", "第8位"],
    correctAnswer: "第6位"
  },
  {
    id: 8,
    question: "2025年農曆新年的生肖動物在十二地支中對應的時辰是？",
    options: ["巳時", "午時", "未時", "申時"],
    correctAnswer: "巳時"
  },
  {
    id: 9,
    question: "2025年農曆新年的生肖動物在十二地支中對應的方位是？",
    options: ["東南", "南", "西南", "西"],
    correctAnswer: "東南"
  },
  {
    id: 10,
    question: "2025年農曆新年的生肖動物在十二地支中對應的季節是？",
    options: ["春", "夏", "秋", "冬"],
    correctAnswer: "夏"
  }
]; 
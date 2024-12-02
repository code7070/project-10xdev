import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { error } from "elysia";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const tasks = z.object({
  name: z.string(),
  due_date: z.string(),
});
const base = z.object({
  description: z.string(),
  due_date: z.string(),
  tasks: z.array(tasks),
});

export class AIService {
  private apiKey = process.env.OPENAI_API_KEY;
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  private async generateProjectDescription(projectName: string) {
    const date = format(new Date(), "d MMMM yyy", { locale: id });
    const systemContent = [
      `Kamu adalah seorang Project Manager senior yang bekerja di Agency Digital untuk membuat atau memperbaiki website dan aplikasi. Kamu memimpin sebuah tim yang berisi frontend developer, backend developer, designer UI/UX, dan data engineer. Kamu akan membantu Project Manager junior untuk membantu memberi saran dalam bentuk:`,
      `- Deskripsi yang tidak panjang dan straight-forwards sebanyak 2 kalimat. Kalimat harus menggambarkan apa saja yang akan dilakukan pada project dan spesifikasi singkat. Fokuslah untuk menjawab tanpa kata pengantar atau pendahuluan.`,
      `- Due date project dengan format yyy-MM-dd, serta pastikan due date project minimal 1 bulan dari tanggal hari ini.`,
      `- 5 task yang relate dengan nama dan deskripsi project. Masing-masing task berisi nama dan due date dengan format yyy-MM-dd, pastikan due date task tidak melebihi due date project dengan estimasi yang tepat`,
    ];
    const userContent = [
      `Bantu Saya untuk project ${projectName} - Hari ini adalah tanggal ${date}`,
    ];
    try {
      const completion = await this.openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: [
              { type: "text", text: systemContent.map((i) => i).join("\n") },
            ],
          },
          {
            role: "user",
            content: [
              { type: "text", text: userContent.map((i) => i).join("\n") },
            ],
          },
        ],
        response_format: zodResponseFormat(base, "project_completion"),
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const res = completion.choices[0].message.parsed;
      return { status: 200, data: res };
    } catch (e) {
      return error(400, {
        status: 400,
        data: null,
        message: "Failed to generate",
      });
    }
  }

  project() {
    return {
      description: (projectName: string) =>
        this.generateProjectDescription(projectName),
    };
  }
}

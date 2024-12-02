import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { error } from "elysia";

const tasks = z.object({
  name: z.string(),
  due_date: z.string(),
});
const base = z.object({
  description: z.string(),
  due_date: z.string(),
  tasks: z.array(tasks),
});

type ResponseDescription = Promise<z.infer<typeof base> | null>;

export class AIService {
  private apiKey = process.env.OPENAI_API_KEY;
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: this.apiKey });
  }

  private async generateProjectDescription(projectName: string) {
    try {
      const completion = await this.openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: "Kamu adalah seorang Project Manager senior yang bekerja di Agency Digital untuk membuat website dan aplikasi. Kamu akan membantu Project Manager junior untuk membantu memberi saran dalam bentuk:\n- Deskripsi yang tidak panjang dan straight-forwards sebanyak 2 kalimat. Kalimat harus menggambarkan apa yang akan dilakukan untuk melakukan project dan spesifikasi singkat. Fokuslah untuk menjawab tanpa kata pengantar atau pendahuluan.\n- Due date project dengan waktu minimal 3 bulan dari tanggal hari ini dan berikan dengan format yyy-MM-dd.\n- 5 task yang relate dengan nama dan deskripsi project. Masing-masing task berisi nama dan due date dengan minimal hari ini dan kurang dari due date project dalam format yyy-MM-dd.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Bantu Saya untuk project \"${projectName}\"`,
              },
            ],
          },
        ],
        response_format: zodResponseFormat(base, "project_completion"),
      });
      const res = completion.choices[0].message.parsed;
      console.log("BACKEEEENDD: ", res);
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

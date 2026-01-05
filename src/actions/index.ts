import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

export const server = {
    sendContact: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string(),
            email: z.string().email(),
            phone: z.string(),
            subject: z.string(),
            message: z.string(),
        }),
        handler: async (input) => {
            const resend = new Resend(import.meta.env.RESEND_API_KEY);

            const { data, error } = await resend.emails.send({
                from: 'Portfolio <onboarding@resend.dev>',
                to: ['wk.juanzuniga@gmail.com'],
                subject: `📩 ${input.subject.toUpperCase()}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #333; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">Nuevo contacto</h2>
                        <p style="margin: 10px 0;"><strong>Nombre:</strong> ${input.name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
                        <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${input.phone}</p>
                        <p style="margin: 10px 0;"><strong>Asunto:</strong> ${input.subject}</p>
                        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0070f3;">
                            <p style="margin: 0; white-space: pre-wrap;">${input.message}</p>
                        </div>
                        <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                            Enviado desde tu portafolio el ${new Date().toLocaleString()}
                        </footer>
                    </div>
                `,
            });
            if (error) throw new Error("Error de Resend");
            return { success: true };
        },
    }),
};
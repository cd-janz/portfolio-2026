import { actions } from 'astro:actions';
const setupForm = (id: string) => {
    const contactForm = document.getElementById(id) as HTMLFormElement | null;
    if(!contactForm) throw new Error('Could not find contact')
    contactForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        if (!(target instanceof HTMLFormElement)) return;
        const btn = target.querySelector('button') as HTMLButtonElement;
        const originalText = btn.innerText;
        try {
            btn.disabled = true;
            btn.innerText = "Sending...";
            const formData = new FormData(target);
            const { data, error } = await actions.sendContact(formData);
            if (error) {
                console.error("Action error:", error);
                alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
            } else {
                console.log("Éxito:", data);
                alert("¡Mensaje enviado con éxito!");
                target.reset();
            }
        } catch (err) {
            console.error("Error inesperado:", err);
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
    });
};
export default setupForm
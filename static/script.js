document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = ace.edit('code-editor');
    codeEditor.setTheme('ace/theme/monokai');
    codeEditor.session.setMode('ace/mode/python');
    codeEditor.setValue(`# Sample Pygame code
import pygame
pygame.init()
screen = pygame.display.set_mode((800, 600))
player = pygame.Rect(100, 100, 50, 50)
speed = 5

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    for i in range(100):  # Inefficient loop
        player.x += speed
    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, (255, 255, 255), player)
    pygame.display.flip()
pygame.quit()
`);

    const outputEditor = ace.edit('output-editor');
    outputEditor.setTheme('ace/theme/monokai');
    outputEditor.session.setMode('ace/mode/python');
    outputEditor.setReadOnly(true);

    // Handle template prompt buttons
    document.querySelectorAll('.template-prompt').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('prompt').value = button.dataset.prompt;
        });
    });

    document.getElementById('suggest').addEventListener('click', async () => {
        const code = codeEditor.getValue();
        const prompt = document.getElementById('prompt').value;
        try {
            const response = await fetch('/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, prompt })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            document.getElementById('suggestion-code').textContent = data.suggestedCode;
            document.getElementById('explanation').textContent = data.explanation;
            document.getElementById('suggestions').classList.remove('hidden');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('integrate').addEventListener('click', () => {
        const suggestedCode = document.getElementById('suggestion-code').textContent;
        outputEditor.setValue(suggestedCode);
    });
});
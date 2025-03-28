let noteCount = 0;

// button scope:
document.querySelector(".add").addEventListener("click", () => {
    const original = document.querySelector(".addNewNote");
    const clone = original.cloneNode(true);
    const header = document.getElementById("headerColor");
    const HeaderColor = Math.floor(Math.random() * 16777215).toString(16);
    header.style.backgroundColor = "#" + HeaderColor;

    clone.style.position = "fixed";
    clone.style.top = `${80 + noteCount * 25}px`;
    clone.style.left = `${80 + noteCount * 25}px`;

    document.body.appendChild(clone);
    noteCount++;

    makeDraggable(clone);

    document.querySelectorAll('.addNewNote').forEach(el => {
        el.addEventListener('click', () => {
            resetIndex();
            el.style.zIndex = "1"
        })
    })
    function resetIndex() {
        document.querySelectorAll('.addNewNote').forEach(el => {
            el.style.zIndex = "auto"
        })
    }
});

// making the notes dragable scope:
function makeDraggable(note) {
    let offsetX, offsetY;

    const move = (e) => {
        note.style.left = `${e.clientX - offsetX}px`;
        note.style.top = `${e.clientY - offsetY}px`;
    };

    note.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - note.offsetLeft;
        offsetY = e.clientY - note.offsetTop;
        document.addEventListener("mousemove", move);
    });

    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
    });
}

makeDraggable(document.querySelector(".addNewNote"));

// dark mode feature:
let lightMode = localStorage.getItem('lightMode');
const Theme = document.getElementById('theme');

const enableLightMode = () => {
    document.body.classList.add('lightMode');
    localStorage.setItem('lightMode', 'active');
};

const disableLightMode = () => {
    document.body.classList.remove('lightMode');
    localStorage.setItem('lightMode', null);
};

if (lightMode === 'active') {
    enableLightMode();
}

Theme.addEventListener("click", () => {
    lightMode = localStorage.getItem('lightMode');
    lightMode !== "active" ? enableLightMode() : disableLightMode();
});
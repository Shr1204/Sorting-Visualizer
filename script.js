
let arr = [];

const delay = ms => new Promise(res => setTimeout(res, ms));

// Generate Bars
function generateBars(num = 50) {
    const container = document.getElementById("bar-container");
    container.innerHTML = "";
    arr = [];

    for (let i = 0; i < num; i++) {
        let val = Math.floor(Math.random() * 300) + 50;
        arr.push(val);

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${val}px`;
        bar.style.width = `${Math.floor(600 / num)}px`; // dynamic width
        container.appendChild(bar);
    }
}

// Swap bars
async function swap(i, j) {
    const bars = document.getElementsByClassName("bar");
    [arr[i], arr[j]] = [arr[j], arr[i]];

    bars[i].style.height = `${arr[i]}px`;
    bars[j].style.height = `${arr[j]}px`;
    bars[i].style.backgroundColor = "red";
    bars[j].style.backgroundColor = "red";

    await delay(100);

    bars[i].style.backgroundColor = "cyan";
    bars[j].style.backgroundColor = "cyan";
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
}

// Selection Sort
async function selectionSort() {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            await swap(i, minIdx);
        }
    }
}

// Merge Sort
async function mergeSortHelper(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);

    let merged = [];
    let i = start, j = mid + 1;

    while (i <= mid && j <= end) {
        if (arr[i] < arr[j]) {
            merged.push(arr[i++]);
        } else {
            merged.push(arr[j++]);
        }
    }

    while (i <= mid) merged.push(arr[i++]);
    while (j <= end) merged.push(arr[j++]);

    for (let k = 0; k < merged.length; k++) {
        arr[start + k] = merged[k];
        const bar = document.getElementsByClassName("bar")[start + k];
        bar.style.height = `${merged[k]}px`;
        bar.style.backgroundColor = "purple";
        await delay(50);
        bar.style.backgroundColor = "cyan";
    }
}

async function mergeSort() {
    await mergeSortHelper(0, arr.length - 1);
}

// Quick Sort
async function partition(low, high) {
    const bars = document.getElementsByClassName("bar");
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(i, j);
        }
    }
    await swap(i + 1, high);
    return i + 1;
}

async function quickSortHelper(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function quickSort() {
    await quickSortHelper(0, arr.length - 1);
}

// 🎚️ Slider for array size
const sizeSlider = document.getElementById("sizeSlider");
const sizeValue = document.getElementById("sizeValue");

sizeSlider.addEventListener("input", function () {
    sizeValue.textContent = sizeSlider.value;
    generateBars(parseInt(sizeSlider.value));
});

// 📦 Initial render
generateBars();

// 📌 Button Events
document.getElementById("bubble").addEventListener("click", () => bubbleSort());
document.getElementById("selection").addEventListener("click", () => selectionSort());
document.getElementById("merge").addEventListener("click", () => mergeSort());
document.getElementById("quick").addEventListener("click", () => quickSort());

document.getElementById("newArray").addEventListener("click", () => generateBars(parseInt(sizeSlider.value)));

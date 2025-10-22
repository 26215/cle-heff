import { locaux, prof } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".grid");

  locaux.forEach((local) => {
    const roomDiv = document.createElement("div");
    roomDiv.className =
      "room relative p-4 bg-gray-800 rounded-xl shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-visible";

    const roomName = document.createElement("span");
    roomName.className = `w-1/3 text-center inline-block mb-2 lg:mb-0 mx-3 px-6 h-full py-3 rounded text-sm font-semibold floor-${local.floor}`;
    roomName.textContent = local.name;

    const containerDiv = document.createElement("div");
    containerDiv.className =
      "autocomplete-container relative w-2/3 mx-3 overflow-visible";
    containerDiv.id = local.name.replace(/\s+/g, "-");

    const input = document.createElement("input");
    input.className =
      "prof-input w-full p-2 mb-2 lg:mb-0 text-white rounded outline-none border border-gray-600 bg-gray-700";
    input.placeholder = "Nom du prof";

    const list = document.createElement("div");
    list.className =
      "autocomplete-list absolute top-full left-0 right-0 bg-gray-800";
    list.dataset.room = local.name.replace(/\s+/g, "-");

    containerDiv.appendChild(input);
    containerDiv.appendChild(list);
    roomDiv.appendChild(roomName);
    roomDiv.appendChild(containerDiv);
    container.appendChild(roomDiv);
  });

  autocompleteProf();
});

function autocompleteProf() {
  document.querySelectorAll(".prof-input").forEach((input) => {
    const listEl = input.parentElement.querySelector(".autocomplete-list");

    input.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      listEl.innerHTML = "";

      if (!value) {
        listEl.classList.add("hidden");
        input.parentElement.style.zIndex = ""; // 👈 Reset z-index
        return;
      }

      input.parentElement.style.zIndex = "1000"; // 👈 Élève le conteneur

      let suggestions = [];

      if (value.length >= 2) {
       suggestions = prof
        .filter((p) => p.name.toLowerCase().includes(value))
        .slice(0, 5);
      

      if (suggestions.length === 0) {
        const noResult = document.createElement("div");
        noResult.className = "autocomplete-suggestion p-2 text-gray-400";
        noResult.textContent = "No results found";
        listEl.appendChild(noResult);
        listEl.classList.remove("hidden");
        return;
      }

      suggestions.forEach(({ name }) => {
        const option = document.createElement("div");
        option.className =
          "autocomplete-suggestion p-2 hover:bg-gray-700 cursor-pointer";
        option.textContent = name;
        option.addEventListener("click", () => {
          input.value = name;
          listEl.classList.add("hidden");
          input.parentElement.style.zIndex = ""; // 👈 Reset z-index
        });
        listEl.appendChild(option);
      });
}
      listEl.classList.remove("hidden");
    });

    input.addEventListener("blur", () => {
      setTimeout(() => {
        listEl.classList.add("hidden");
        input.parentElement.style.zIndex = ""; // 👈 Reset z-index
      }, 200);
    });

    input.addEventListener("blur", () => {
      setTimeout(() => listEl.classList.add("hidden"), 200);
    });
  });
}

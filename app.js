document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-agregar");
    const lista = document.getElementById("lista-compras");
  
    
    cargarLista();
  
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevoItem = document.getElementById("item").value.trim();
      if (nuevoItem) {
        agregarItem(nuevoItem, false);
        guardarLista();
        form.reset(); 
      }
    });
  
    
    function agregarItem(texto, completado) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
  
      li.innerHTML = `
        <span class="${completado ? 'completado' : ''}" style="cursor: pointer;">${texto}</span>
        <div>
          <button class="btn-editar btn btn-sm btn-warning">✏️</button>
          <button class="btn-eliminar btn btn-sm btn-danger">❌</button>
        </div>
      `;
  
      
      li.querySelector("span").addEventListener("click", () => {
        li.querySelector("span").classList.toggle("completado");
        guardarLista(); 
      });
  
     
      li.querySelector(".btn-editar").addEventListener("click", () => {
        const nuevoTexto = prompt("Editar ítem:", texto);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
          li.querySelector("span").textContent = nuevoTexto.trim();
          guardarLista();
        }
      });
  
      
      li.querySelector(".btn-eliminar").addEventListener("click", () => {
        lista.removeChild(li);
        guardarLista();
      });
  
      lista.appendChild(li);
    }
  
    
    function guardarLista() {
      const items = Array.from(lista.querySelectorAll("li")).map((li) => {
        return {
          texto: li.querySelector("span").textContent,
          completado: li.querySelector("span").classList.contains("completado"),
        };
      });
      localStorage.setItem("listaCompras", JSON.stringify(items));
    }
  
    
    function cargarLista() {
      lista.innerHTML = "";
      const items = JSON.parse(localStorage.getItem("listaCompras")) || [];
      items.forEach((item) => agregarItem(item.texto, item.completado));
    }
  });
  
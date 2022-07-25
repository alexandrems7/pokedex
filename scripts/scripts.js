let page = 0;
let limite;

async function getAllPokemons() {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${page}",`
  );
  const data = await resp.json();

  /* console.log(data) */

  data.results.forEach(async function (pokemon) {
    const respPoke = await fetch(pokemon.url);
    const dataPoke = await respPoke.json();

    const tipo1 = dataPoke.types[0].type.name;
    let tipo2 = "";

    try {
      tipo2 = dataPoke.types[1].type.name;
    } catch (a) {
      tipo2 = "";
    }

    let stringTipo;

    if (tipo2 != "") {
      stringTipo = `${tipo1} e ${tipo2}`;
    } else if (tipo2 === "") {
      stringTipo = `${tipo1}`;
    }

    const descrição = await fetch(dataPoke.species.url);
    const Descrição = await descrição.json();

    document.querySelector("#cards-poke").insertAdjacentHTML(
      "beforeend",
      `
      
      <div class="card">
      <img class="imagem" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        dataPoke.id
      }.png" alt="imagem de pokemon" height="220">

      <div>
          <h2 class="nome">${dataPoke.name.toUpperCase()}</h2>
          <h3 class="numero"> Número: ${dataPoke.id}</h3>
          <h4 class="tipo" >Tipo: ${stringTipo}</h4>
          <h4>Descrição</h4>

          <p>
            ${Descrição.flavor_text_entries[1].flavor_text
              .replace("", "")
              .replace("POKéMON", "Pokemon")}
              
          </p>

      </div>
  </div>
    
    `
    );
  });
}

getAllPokemons();

function verMais(){
  page=page+20;
  getAllPokemons();  
  }


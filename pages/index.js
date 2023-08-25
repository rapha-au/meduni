import Image from 'next/image'
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/navigation'
const fs = require('fs');
import {loadData} from './disk'
import { useState, useEffect } from 'react'

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

function TopBlock(){

  return(
    <header>
      <Link href="#whoarewe" scroll={false} style={{textDecoration:"none"}}>
			  <span className='link-element'>Quem Somos</span>
		  </Link>
      <Link href="#mission" scroll={false} style={{textDecoration:"none"}}>
			  <span className='link-element'>Missão</span>
		  </Link>
      <Link href="#scheduling" scroll={false} style={{textDecoration:"none"}}>
			  <span className='link-element'>Agendamento</span>
		  </Link>
      <Link href="#contact" scroll={false} style={{textDecoration:"none"}}>
			  <span className='link-element'>Contato</span>
		  </Link>

    </header>
  )
}

function Title(){

  return(
  <div class="home-grid-container">
  <div className="block" style={{backgroundColor:"whitesmoke"}}>
    <div><Image
      loader={imageLoader}
      src={"./meduniLogoExport.png"}
      width={417}
      height={97}
      alt={""}
    /></div>
  </div>
  </div>
  )
}

function WhoAreWe(){
  return(
    
    <div id="whoarewe" className="block">
    <div class="home-grid-container">  
    <div className="statementDesc" style={{
        	gridColumnStart: "1",
          gridColumnEnd: "1",
          marginLeft:"4em",
          width:"50%"
      }}>
      Fundada durante a pandemia, a 
      <span style={{color:"green"}}> MedUni</span> é uma clínica
      completamente diferente.
      Aqui nós prezamos pela rapidez e
      simplicidade no agendamento das consultas,
      assim como a possibilidade de utilizar todo o
      sistema do conforto da sua casa
    </div>

    <span>
    <div className="healthSymbol"><Image
      loader={imageLoader}
      src={"./medSymbolExport.png"}
      width={96}
      height={97}
      alt={""}
      style={{marginRight:"10em"}}/></div>
    </span>

    <div className="statement" style={{
        	gridColumnStart: "3",
          gridColumnEnd: "3",
      }}>Quem Somos</div>
    </div>
    </div>
  )
}

function MissionBlock(){
  return(
    <div id="mission" className="block">

      <div class="home-grid-container">

      <div className="statement" style={{
        	gridColumnStart: "1",
          gridColumnEnd: "1",
          marginLeft:"1em",
          width:"70%"
      }}>Missão</div>

      <span>
      <div className="healthSymbol"><Image
        loader={imageLoader}
        src={"./medSymbolExport.png"}
        width={96}
        height={97}
        alt={""}
        style={{marginLeft:"18em"}}
      /></div>
      </span>

      <div className="statementDesc" style={{
        	gridColumnStart: "3",
          gridColumnEnd: "3",
          marginLeft:"3em"
      }}>
        Nossa <span style={{color:"green"}}>missão</span> aqui na clínica <span style={{color:"green"}}>MedUni</span> é unir a tecnologia com a medicina. 
        Oferecendo os melhores atendimentos, com profissionais excepcionais e com possibilidade de agendamento online
      </div>

      </div>

    </div>
  )
}

function ImagesBlock(){

  return (
      <div className="image-box">
      <Image
      loader={imageLoader}
      src={"./clinic1.webp"}
      width={450}
      height={350}
      alt={""}
    />
    <Image
      loader={imageLoader}
      src={"./clinic2.jpeg"}
      width={450}
      height={350}
      alt={""}
    />
    <Image
      loader={imageLoader}
      src={"./clinic3.webp"}
      width={450}
      height={350}
      alt={""}
    />
    <Image
      loader={imageLoader}
      src={"./clinic4.jpeg"}
      width={450}
      height={350}
      alt={""}
    />
    </div>
    )
}

function onChangeSelectOption(event){
  event.preventDefault()

  if (typeof window !== "undefined") {
    if(document.querySelector("select").value === "nome"){
      let ms = document.getElementById("medicSearch")
      ms.onkeyup = searchByName

    }else if(document.querySelector("select").value === "especialidade"){
      let ms = document.getElementById("medicSearch")
      ms.onkeyup = searchBySpecialty
    }
  }
}

function searchByName(event){
  event.preventDefault();
  if (typeof window !== "undefined") {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("medicSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("medics");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
}

function searchBySpecialty(event){
  event.preventDefault();
  if (typeof window !== "undefined") {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("medicSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("medics");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

}

function SchedulingBlock(){
  let ndata = loadData();
  let medicData = ndata.data.medicos;
  const router = useRouter();

  return(
    <div id="scheduling" className="block" style={{padding:"7em"}}>
      <span style={{fontSize:"3em", color:"green", padding:"2em"}}>Agendamento</span>
      <div style={{margin:"1em"}}>Agende agora mesmo sua consulta na <span style={{color:"green"}}>MedUni</span> com somente alguns cliques!</div>
     <div style={{padding:"2em"}}>
        <form action="" method="post">
        <label for="searchOptions">Pesquisar médicos por:</label>
        <select name="medicSearch" id="searchOptions" onChange={onChangeSelectOption}>
          <option value="nome">Nome</option>
          <option value="especialidade">Especialidade</option>
        </select>
        <input id="medicSearch" placeholder="Pesquisar..." onKeyUp={onChangeSelectOption}></input>
        </form>
      </div>

      <div className="table-grid">
      <table id="medic-table">
      <tbody id="medics">
      <tr>
        <th>Nome</th>
        <th>Especialidade</th>
      </tr>

      {
        medicData.map((medico)=>{
          return(
            <tr onClick={()=>{

            router.push({
              pathname: '/schedulingPage',
              query: {
                id: medico.id,
                name: medico.nome,
                specialty: medico.especialidade,
                address: medico.endereco,
                description: medico.descricao,
                src:medico.src
              }});


            }}>
            <td>{medico.nome}</td>
            <td>{medico.especialidade}</td>
             
           </tr>


           )
        })
      }

      </tbody>
      </table>
      </div>

    </div>
  )
}

function BottomBlock(){
  return(
    <footer id="contact">
      <h1 style={{padding:"1em", color:"white"}}>Quer falar diretamento conosco?</h1>
      <div className="home-grid-container">
        <div style={{
        	gridColumnStart: "1",
          gridColumnEnd: "1"
      }}>
        <h2 style={{padding:"0.5em", color:"white"}}>Contato:</h2>

        <div>
        <Image
        loader={imageLoader}
        src={"./phoneIcon.png"}
        width={20}
        height={20}
        alt={""}
        style={{marginRight:"15px"}}
        />
          Telefone: (00) 0000-0000
        </div>

        <div>
        <Image
        loader={imageLoader}
        src={"./watsappicon.png"}
        width={20}
        height={20}
        alt={""}
        style={{marginRight:"15px"}}
        />
          Watsapp: (00) 0000-0000
        </div>

        <div>
        <Image
        loader={imageLoader}
        src={"./emailIcon.png"}
        width={20}
        height={20}
        alt={""}
        style={{
          marginLeft:"35px",
          marginRight:"15px"}}
        />
          Email: example@meduni.com</div>
        </div>

        <div style={{
        	gridColumnStart: "3",
          gridColumnEnd: "3"
      }}>
          <h2 style={{padding:"0.5em", color:"white"}}>Endereço:</h2>
          <div>Unidade 1 - Mansur, Rua Arantes, N 203</div>
          <div>Unidade 2 - Vila Alegre, Rua Pacheco, N 97</div>
          <div>Unidade 3 - Jardim Acácia, Rua Aymoré, N 120 </div>
        </div>
      </div>
      
    </footer>
  )
}


export default function Home(){

  return (
    <div className = "block-box">
      <Head>
	<title>MedUni - Unindo tecnologia e medicina</title>
	<meta property="og:title" content="MedUni - Unindo tecnologia e medicina" key="title" />

	</Head>
        <TopBlock/>
        <Title/>
        <WhoAreWe/>
        <MissionBlock/>
        <ImagesBlock/>
        <SchedulingBlock/>
        <BottomBlock/>  
    </div>
  )
}

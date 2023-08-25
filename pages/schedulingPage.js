import {loadData, saveData, Test} from './disk'
import { useRouter } from 'next/router'
import { withRouter } from 'next/router'
import Image from 'next/image'
import Link from "next/link";
import Head from 'next/head';

let savedQueries = []

function TopBlock(){

  return(
    <header>
      <Link href={"/"} style={{textDecoration:"none"}}>
			  <span className='link-element'>Home</span>
		  </Link>
    </header>
  )
}

function openModal_scheduling(){
  document.getElementById('scheduleModal').style.display='block';
}

function closeModal_scheduling(){
  document.getElementById('scheduleModal').style.display='none';
}

function openModal_medicTime(){
  document.getElementById('medicTimeModal').style.display='block';
}
function closeModal_medicTime(){
  document.getElementById('medicTimeModal').style.display='none';
}

function saveAppointment(){
  if (typeof window !== "undefined") {
    let patientName = document.getElementById("patientName").value;
    
    let appointmentTime = document.getElementById("appointmentTime").value;
    let appointmentDate = document.getElementById("appointmentDate").value;

    let determineSex = ()=>{
      let sexMale = document.getElementById("sexMale").checked;
      let sexFemale = document.getElementById("sexFemale").checked;
      if(sexMale == true && sexFemale == false){
        return "Masculino"
      }else if(sexFemale == true && sexMale == false){
        return "Feminino"
      }else{
        return "Err"
      }
    }
    let patientSex = determineSex();

    let additionalNotes = document.getElementById("additionalNotes").value;

    savedQueries.push({
      "numero":savedQueries.length,
      "nome-paciente":patientName,
      "horario":appointmentTime,
      "data":appointmentDate,
      "sexo":patientSex,
      "notas":additionalNotes
    })




    console.log(savedQueries)
  }
}

function resetForm(){
  document.getElementById("patientName").value = ""
  document.getElementById("appointmentTime").value = ""
  document.getElementById("appointmentDate").value = ""
  document.getElementById("sexMale").checked = false;
  document.getElementById("sexFemale").checked = false;
  document.getElementById("additionalNotes").value = "";
}

function updateQueries(){
  let table = document.getElementById('visualize-tbody');


  //Delete rows first
	let rowCount = table.rows.length;
	if(rowCount > '1'){
		let row = table.deleteRow(rowCount-1);
		rowCount--;
	}

  //Update rows
  for(let i=0; i<savedQueries.length;i++){
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);

  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);

  cell1.innerHTML = savedQueries[i].numero;
  cell2.innerHTML = savedQueries[i]["nome-paciente"]; 
  cell3.innerHTML = savedQueries[i].data; 
  cell4.innerHTML = savedQueries[i].horario;
  cell5.innerHTML = savedQueries[i].sexo;
  }
/*
  savedQueries.map((query)=>{
    document.getElementById("visualize-tbody").append(
      <tr>
      <td>{query.numero}</td>
      <td>{query["nome-paciente"]}</td>
      <td>{query.data}</td>
      <td>{query.horario}</td>
      <td>{query.sexo}</td>    
      </tr>
    )})*/
}

export default function medicView({ localData }){
  const router = useRouter();
  const routerData = router.query;


  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }



    return(
        <div>
          <Head>
          <title>MedUni - Agendamento</title>
          <meta property="og:title" content="MedUni - Agendamento" key="title" />

          </Head>
        <TopBlock/>
        <div className="grid-container">
            
          <div className="medicPhoto"><Image
            loader={imageLoader}
            src={routerData.src}
            width={300}
            height={500}
            alt={""}
            style={{
              border:"#04AA6D",
              borderStyle: "solid",
              borderWidth: "2px"
            }}
          /></div>
          
          <div className="medicName">{routerData.name}</div>
          <div className="medicSpecialty">{routerData.specialty}</div>
          <div className="medicDescription">{routerData.description}</div>
          <div className="medicAddress">{routerData.address}</div>

          <div>
          <button className="schedule-btn" onClick={openModal_scheduling}>Agendar Consulta</button>
          </div>

          <div>
          <button className="visualize-btn" onClick={openModal_medicTime}>Vizualizar Consultas</button>
          </div>
          


          
          <div id="scheduleModal" className="modal">
          <div>
            <div>
              <div>

              <div className="modal-item" style={{
                fontSize:"1em"
              
              }}>Preencha o formulário para efetuar o agendamento da sua consulta</div>

              <div className="modal-item" >
              <input type="text" id="patientName" placeholder="Nome do Paciente" required></input>
              </div>

              <div className="modal-item" >
              <label for="appointmentTime" style={{fontSize:"0.7em"}}>Horário da Consulta:</label>
              <input type="time" id="appointmentTime" name="appointmentTime"></input>
              </div>

              <div className="modal-item" >
              <label for="appointmentDate" style={{fontSize:"0.7em"}}>Data da Consulta:</label>
              <input type="date" id="appointmentDate" ref={node => {
                if (node !== null){
                  node.min = new Date().toISOString().split("T")[0]
                }
              }}></input>
              </div>
              
              <div className="modal-item" >
              <label style={{fontSize:"0.7em"}} for="sexMale">Masculino: </label>
              <input type="radio" name="patientSex" id="sexMale"></input>
              <br/>
              <label style={{fontSize:"0.7em"}} for="sexFemale">Feminino: </label>
              <input type="radio" name="patientSex" id="sexFemale"></input>
              </div>

              <div className="modal-item">
              <textarea id="additionalNotes" cols="35" rows="15" placeholder="Considerações Adicionais"></textarea>
              </div>

              <div className="modal-item" >
                <button style={{padding:"1em", margin:"1em"}} onClick={()=>{
                  //let ld = loadData();
                  saveAppointment();
                  resetForm();
                  if (typeof window !== "undefined") {
                    updateQueries();
                  }

                  closeModal_scheduling();
                }}>Confirmar</button>

                <button style={{padding:"1em", margin:"1em"}} onClick={closeModal_scheduling}>Cancelar</button>

              </div>

              </div>
            </div>
          </div>
        </div>


        <div id="medicTimeModal" className="modal">
        <span style={{fontSize:"32px"}}onClick={closeModal_medicTime}>&times;</span>

        <table id="visualize-table">
        <tbody id="visualize-tbody">
        <tr>
          <th>Número</th>
          <th>Nome do Paciente</th>
          <th>Data</th>
          <th>Horário</th>
          <th>Sexo</th>
        </tr>



        </tbody>
        </table>
        </div>
      
        </div>
  
        </div>
    )

}

withRouter(medicView)
import {useGetUserRatingQuery, useGetUserSubmissionsQuery} from "./services/rtk_api/trackerApi";
import {usernames, pset} from  "./constants"

function App() {

  function getTHTD(problem, isTH, status){
		for(const element of pset){
		for(const problem of element.problems){
			if(isTH){
			return(<th><b>{problem}</b></th>)
			} else {
			if(status){
				<td>YES</td>
			} else {
				<td>NO</td>
			}
			}
		}
		}
	}

	function bifurcatepname(pname){
		return pname.match(/[^\d]+|\d+/g);
	}

	function GetUserSubmission(handle, pname){
		return useGetUserSubmissionsQuery({
		username: handle, 
		contestID: pname[0], 
		pname : pname[1],
		})
	}

	function stateChange(newState) {
		setTimeout(function () {
		if (newState == -1) {
			console.log("Waiting.....")
		}
		}, 5000);
	}

  

  	function getTableData(){
    	let elements = []
    	let headerElements = [];
    	headerElements.push(<th>Username</th>)
    	headerElements.push(<th>Rating</th>)

		for(const element of pset){
			for(const problem of element.problems){
				headerElements.push(getTHTD(problem, true, true))
			}
		}

		let tableHeader = <thead><tr>{headerElements}</tr></thead>
		elements.push(tableHeader)
		let loggerProblems = []
		let bodyElements = []
		let idx = 0;
		const sleep = ms => new Promise(res => setTimeout(res, ms));
    	for(const handle of usernames){
			let rowElements = []
			for(const element of pset){
				sleep(2000).then(() => {})
				for(const problem of element.problems){
					// console.log(problem)
					sleep(2000).then(() => {
						let pname = bifurcatepname(problem)
						let prob = <>{pname}<br/></>
						loggerProblems.push(pname)
						console.log(pname)
					})
					// setTimeout(() => {  console.log(`World! ${idx}`); }, 5000);
					// const {data, isSuccess, isError} = GetUserSubmission(handle, pname)
					// if(isSuccess){
					// 	rowElements.push(getTHTD(problem, false, data.accepted))
					// } 
					// if(isError) {
					// 	console.log("Something is really wrong!!")
					// 	idx += 1;
					// }
				}
			}
			let tableRow = <tr>{rowElements}</tr>
			bodyElements.push(tableRow)
		}
		let tableBody = <tbody>{bodyElements}</tbody>
		elements.push(tableBody)
		return <><table>{elements}</table></>
		// return loggerProblems
	}

  return (
    <>
      {getTableData()}
    </>  
  );
}

export default App;

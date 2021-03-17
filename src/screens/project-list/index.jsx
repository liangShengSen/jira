import React from 'react'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState, useEffect } from 'react'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
	const [list,setList] = useState([])
	const [users,setUsers] = useState([])
	const [param,setParam] = useState({
		name: '',
		personId: ''
	})

	useEffect(() => {
		fetch(`${apiUrl}/projects`).then(async response => {
			if(response.ok) {
				setList(await response.json())
			}
		})
	},[param])

	useEffect(() => {
		fetch(`${apiUrl}/users`).then(async response => {
			if(response.ok) {
				setUsers(await response.json())
			}
		})
	}, [])

	return <div>
		<SearchPanel users={users} param={param} setParam={setParam} />
		<List users={users} list={list} />
	</div>
}
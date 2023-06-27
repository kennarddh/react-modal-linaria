/* eslint-disable jest/require-hook */
import React from 'react'
import ReactDOM from 'react-dom/client'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { ModalsProvider } from 'Contexts/Modals'

import App from './App'

import './Styles.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<DndProvider backend={HTML5Backend}>
			<ModalsProvider>
				<App />
			</ModalsProvider>
		</DndProvider>
	</React.StrictMode>
)

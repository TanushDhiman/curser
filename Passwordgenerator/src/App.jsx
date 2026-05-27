import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(5)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [password, setpassword] = useState("")
  
  const passref = useRef(null)
  const generatePassword = useCallback(() => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (number) chars += '0123456789'
    if (character) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    let generatedPassword = ''
    for (let i = 1; i <= length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setpassword(generatedPassword)
  }, [length, number, character,setpassword])
  const copyPassword = useCallback(() => {
    passref.current?.select();
    navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-700 to-indigo-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Password Generator</h1>
        
        <div className="flex gap-2 mb-6 ">
          <input 
            type="text" 
            value={password} 
            readOnly 
            className="flex-1 px-4 py-3 text-gray-800 text-lg border-2 border-gray-200 rounded-lg outline-none focus:border-purple-500 bg-gray-50 font-mono transition-colors"
            placeholder="Your password will appear here"
            ref={passref}
          />
          <button 
            onClick={copyPassword}
            className="px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            Copy
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input 
              type="checkbox" 
              checked={number} 
              onChange={(e) => setnumber(e.target.checked)}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
            />
            <span className="text-gray-700 text-lg">Numbers</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input 
              type="checkbox" 
              checked={character} 
              onChange={(e) => setcharacter(e.target.checked)}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
            />
            <span className="text-gray-700 text-lg">Special Characters</span>
          </label>
        </div>

        <div className="mb-6">
          <label className="flex flex-col gap-2">
            <span className="text-gray-700 text-lg">
              Length: <strong className="text-purple-600 text-xl">{length}</strong>
            </span>
            <input 
              type="range" 
              min="4" 
              max="20" 
              value={length} 
              onChange={(e) => setlength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </label>
        </div>

      </div>
    </div>
  )
}

export default App

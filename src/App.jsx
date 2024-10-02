
import "./index.css";

/**
 *TODO: Make sure you have vite installed on your machine. Then run npm install && vite dev and get started:
 ** Design a component that follows this design: in root of project (/imgur magic.png)
 ** The styles of this design do not need to be handled in this part, they will be addressed in index.css.
 **
 ** These are the steps you should take in your implementation of this component:
 ** 1. Create an input that takes a user's input and stores it in a list of submissions 
 **    List of submissions should be displayed below the input in the form of tags.
 **    When an input is added to the list it should be cleared from the input box
 ** 2. Style the component to match the designs. It should be centered on the page as well.
 ** 3. Implement a parenthesis-validation logic. If the user input has mismatched parentheses then it is INVALID and should not be allowed to be submitted.
 **    Also when a input is invalid in the text box the text box should be highlighted in red, and a message displayed.
 **    
 **    (())     << valid 
 **       
 **    ([{}])   << valid
 **    ({})[]   << valid
 **    ()[]{}   << valid
 **    {()[]}   << valid
 **
 **    ((((()   << invalid
 **    ([{}]    << invalid
 **    )        << invalid
 **    [        << invalid
 **    ({[)}]   << invalid
 **    )))(((
 ** Bonus. Add an undo button next to input to remove the most recently added string on the list.
 */
import { useCallback, useState } from 'react'


const ValidSubmissionsChip = ({submission}) => {
  return (
    <div className="submission-chip">
      {submission}
    </div>
  )
}

const App = () => {

  const [value, setValue] = useState('')
  const [validSubmissions, setValidSubmissions] = useState([])
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(true)
    if (!value.length) return
    if (checkValidStr(value)) {
      setValidSubmissions([...validSubmissions, value])
      setError(false)
      setValue('')
    }
  }




  const handleUndo = useCallback((e) => {
    e.preventDefault()
    if (validSubmissions.length) {
      const filteredArr = validSubmissions.filter((sub, index) => index !== validSubmissions.length - 1 ? sub : null)
      setValidSubmissions([...filteredArr])
    }
  },[validSubmissions])


  const checkValidStr = (value) => {
    let stack = []
    let closeToOpen = {")": "(", "}": "{", "]": "["}
    
    value.trim().split('').forEach(char => {
      // value = "{()[]}"
      // stack = [{,[, ]
      if (stack.length) {
         
        if (stack[stack.length - 1] === closeToOpen[char]) { 
          stack.pop()
        } else {
          stack.push(char)
        }
      } else {
        stack.push(char)
      }
    })
    return stack.length === 0

  }


  return <div className="container">
    <form onSubmit={handleSubmit} className="form-container">
    <div className={error ? "input-container input-error" : "input-container"}>
      <input  placeholder="Enter pattern here" onChange={(e) => setValue(e.target.value)} type="text" value={value} name="parens-input"/>
    <button  className="submit-button">Submit</button>
    {validSubmissions.length ? <button type="" onClick={handleUndo} className="undo-button">Undo</button> : null
}
    </div>
      
    
    {error && <span>Invalid pattern.</span>}
    {validSubmissions && <div className='valid-submissions-container'>
      {validSubmissions.map((submission, index)=> <ValidSubmissionsChip key={index} submission={submission} />)}
    </div>}
    </form>
  </div>;
};




export default App;
import Answers from './Answers';
function QuestionAnswer({item,index}) {
    return(
        <>
        <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                  {item.type == 'q' ?
                    <li key={index + Math.random()} className='text-right dark:text-zinc-300 text-zinc-800 p-1 border-4 dark:bg-zinc-700 bg-amber-200 dark:border-zinc-700 border-amber-200 rounded-3xl w-fit'> <Answers ans={item.text} totalAnswer={1} index={index} type={item.type} /></li>
                    : item.text.map((ansItem, ansIndex) => (
                      <li key={ansItem + Math.random()} className='text-left p-5'> <Answers ans={ansItem} totalAnswer={item.length} index={index} type={item.type} /></li>

                    ))
                  }
                </div>
        </>
    )
}
export default QuestionAnswer
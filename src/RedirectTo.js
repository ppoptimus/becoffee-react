import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function RedirectTo() {
    const history = useHistory()
    const [seconds, setSeconds] = useState(5);

    useEffect(()=>{
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
          } else {
            history.push("/")
          }
    })

    
    return (
        <div>
            <span>กำลังนำท่านไปยังหน้าหลักใน {seconds} วินาที</span>
        </div>
    )
}

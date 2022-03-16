import Image from 'react-bootstrap/Image'


export default function ImageProfile ({host}){

const {profilePic} = host


    return(
        <div>
            <Image src={profilePic} width={100} className='img-fluid rounded'/>
        </div>
    )
}

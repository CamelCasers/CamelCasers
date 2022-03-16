import Image from 'react-bootstrap/Image'


export default function ImageProfile({artist}){

const {profilePic} = artist


    return(
        <div>
            <Image src={profilePic} width={100} className='img-fluid rounded'/>
        </div>
    )
}

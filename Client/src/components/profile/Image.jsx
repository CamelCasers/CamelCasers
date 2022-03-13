import Image from 'react-bootstrap/Image'


export default function ImagesCarrousel ({host}){

const {profilePic} = host


    return(
        <div>
            <Image src={profilePic} width={100}/>
        </div>
    )
}
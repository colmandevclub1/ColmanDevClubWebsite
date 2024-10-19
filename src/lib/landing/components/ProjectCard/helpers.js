import { ReactComponent as ReactSvg } from 'src/assets/react.svg'
import { ReactComponent as JavaScriptSvg } from 'src/assets/javascript.svg'
import { ReactComponent as TypeScriptSvg } from 'src/assets/typescript.svg'
import { ReactComponent as NodeSvg } from 'src/assets/nodejs02.svg'
import { ReactComponent as HtmlSvg } from 'src/assets/html5.svg'
import { ReactComponent as CssSvg } from 'src/assets/css3.svg'
import { ReactComponent as ExpressSvg } from 'src/assets/expressjs.svg'
import { ReactComponent as MongoDBSvg } from 'src/assets/mongodb.svg'
import { ReactComponent as FirebaseSvg } from 'src/assets/firebase.svg'
import { ReactComponent as GitSvg } from 'src/assets/git.svg'
import { ReactComponent as DockerSvg } from 'src/assets/docker.svg'
import { ReactComponent as VercelSvg } from 'src/assets/vercel.svg'

const size = 18;
const color = "#fff"

export const languageIconMap = {
    "react.js":  <ReactSvg fill={color} width={size} height={size}/>,
    javascript: <JavaScriptSvg fill={color} width={size} height={size}/>,
    typescript: <TypeScriptSvg fill={color} width={size} height={size}/>,
    "node.js": <NodeSvg fill={color} width={size} height={size}/>,
    html: <HtmlSvg fill={color} width={size} height={size}/>,
    css: <CssSvg fill={color} width={size} height={size}/>,
    express: <ExpressSvg fill={color} width={size} height={size}/>,
    mongodb: <MongoDBSvg fill={color} width={size} height={size}/>,
    firebase: <FirebaseSvg fill={color} width={size} height={size}/>,
    git: <GitSvg fill={color} width={size} height={size}/>,
    docker: <DockerSvg fill={color} width={size} height={size}/>,
    vercel: <VercelSvg fill={color} width={size} height={size}/>,
}
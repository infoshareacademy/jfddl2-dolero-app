// import React from 'react'
// import { ReactSlackChat } from 'react-slack-chat';
//
// class Helpdesk extends React.Component {
//     render() {
//         return (
//             <ReactSlackChat
//                 botName='5punk-unique-id' // VisitorID, CorpID, Email, IP address etc.
//                 apiToken='base64-encoded-api-token-119aab37r32r32r316e0296c3da'
//                 channels={[
//                     {
//                         name: 'random'
//                     },
//                     {
//                         name: 'test',
//                         id: 'C48SAX4',
//                         icon: ''
//                     },
//                     {
//                         name: 'test22',
//                         id: '',
//                         icon: './logo.svg'
//                     }]}
//                 helpText='Optional Help Text'
//                 themeColor='#856090'
//                 userImage='http://www.iconshock.com/img_vista/FLAT/mail/jpg/robot_icon.jpg'
//                 debugMode={true}
//                 hooks={[
//                     {
//                         /* My Custom Hook */
//                         id: 'getSystemInfo',
//                         action: () => 'MY SYSTEM INFO!'
//                     }
//                 ]}
//             />
//         )
//     }
// }
//
//
//
// export default Helpdesk;
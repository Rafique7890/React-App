
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx'

const Messages = () => {
  const {messages, loading}= useGetMessages();
  console.log("messages",messages);
  return (
    <div className=' px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((messages) => {
        <Message key={messages._id} message={message} />
      })}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className=' text-center'>Send a message to start conversation</p>
      )}
    </div>
  )
}

export default Messages;
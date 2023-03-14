

function NoteItem({noteData})
{

    return(
        <div className="note-item-container">
            <div className="note-head">
                <b style={{margin:'0px 1vw'}}>{noteData.author}</b>
                {noteData.createdAt.slice(0,10)}
            </div>
            <div className="note-content">
                {noteData.content}
            </div>
        </div>
    )
}

export default NoteItem
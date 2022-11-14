import React, { useRef, useState } from "react";
import { Editor as DraftEditor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
function Editor() {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	const editor = useRef(null);
	function focusEditor() {
		editor.current.focus();
	}
	return (
		<div style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }} onClick={focusEditor}>
			<DraftEditor
				ref={editor}
				editorState={editorState}
				onChange={setEditorState}
				placeholder="Write something!"
			/>
		</div>
	);
}

export default Editor;

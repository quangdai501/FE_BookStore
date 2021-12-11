import React, { useRef, useState, useEffect } from 'react';
import './style.scss';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
TextEditer.propTypes = {
    handleDesc: PropTypes.func.isRequired,
    initialContent: PropTypes.string
}
export default function TextEditer(props) {
    const initContent = props.initialContent || '';
    const editorRef = useRef(null);
    const [saveStatus, setSaveStatus] = useState(false);
    const submitContent = () => {
        setSaveStatus(true);
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            props.handleDesc(content);
        }
    };
    const onChange = () => {
        if (saveStatus) {
            setSaveStatus(false);
        }
    }
    useEffect(() => {
        props.handleDesc(initContent)
    }, [initContent])
    return (
        <div>
            <Editor
                apiKey="ehf1z6id8elyvznclxq7eacc1pbfuy60pwyiiu7zzpue7iqd"
                initialValue={initContent}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    height: 250,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={() => onChange()}
            />
            <button type="button" onClick={submitContent} disabled={saveStatus} className="btn btn--border-none mt-5">Lưu nội dung</button>
        </div>
    );
}
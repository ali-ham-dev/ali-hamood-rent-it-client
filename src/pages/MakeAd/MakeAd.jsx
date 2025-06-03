import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-example-setup/style/style.css';
import './MakeAd.scss';
import { useState, useEffect } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import Section from '../../components/Section/Section';

const MakeAd = () => {
    const [editorView, setEditorView] = useState(null);

    useEffect(() => {
        // Create a schema with list support
        const mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks
        });

        // Create the editor state
        const state = EditorState.create({
            schema: mySchema,
            plugins: exampleSetup({ schema: mySchema })
        });

        // Create the editor view
        const view = new EditorView(document.querySelector("#editor"), {
            state,
            dispatchTransaction(transaction) {
                const newState = view.state.apply(transaction);
                view.updateState(newState);
            }
        });

        setEditorView(view);

        return () => {
            if (view) {
                view.destroy();
            }
        };
    }, []);

    return (
        <div className='make-ad'>
            <Section title='Make Ad' headingLevel='h2' content={
                <div id="editor" className="make-ad__editor" />
            } />
        </div>
    );
};

export default MakeAd;
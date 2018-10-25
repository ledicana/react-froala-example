import React, { Component } from 'react';
import 'froala-editor/js/froala_editor.min.js';
import 'froala-editor/css/froala_editor.min.css';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/css/plugins/video.min.css';
import $ from 'jquery';
import FroalaEditor from 'react-froala-wysiwyg';

class ReactFroalaExample extends Component {
    constructor() {
        super();

        this.state = {
            model: 'Insert video here ...',
            config: {
                toolbarButtons: ['bold', 'italic', 'custom_dropdown'],
                pluginsEnabled: ['video'],
                videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
                toolbarInline: true,
                events: {
                    'froalaEditor.commands.after': (e, editor, cmd, value) => {
                        if (cmd === 'custom_dropdown' && value === 'showVideoPopup') {
                            //  error occurs with this function:
                            editor.video.showInsertPopup();
                        }
                    }
                }
            }
        };


        this.handleModelChange = this.handleModelChange.bind(this);

        $.FroalaEditor.DefineIcon('custom_dropdown', {NAME: 'cog'});
        $.FroalaEditor.RegisterCommand('custom_dropdown', {
            title: 'More options',
            type: 'dropdown',
            focus: false,
            undo: false,
            refreshAfterCallback: true,
            options: {
                'showVideoPopup': 'Show video popup',
            }
        });
    }

    handleModelChange(model) {
        this.setState({
            model
        });
    }

    render() {
        return (
            <div>
                <FroalaEditor
                    config={this.state.config}
                    model={this.state.model}
                    onModelChange={this.handleModelChange}
                />
            </div>
        );
    }
}

export default ReactFroalaExample;

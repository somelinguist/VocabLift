VocabularyManager
=================

Language-learning tool that uses vocabulary from LIFT-format dictionaries produced by programs such as Fieldworks Language Explorer and WeSay.

<h3>Download</h3>
<strong><a href="http://sourceforge.net/projects/vocabmanager/files/Releases/0.1.7/VocabularyManager_0.1.7.zip/download">Version 0.1.7</a>:</strong> Available on SourceForge at <a href="http://sourceforge.net/projects/vocabmanager/files/Releases/0.1.7/VocabularyManager_0.1.7.zip/download">http://sourceforge.net/projects/vocabmanager/files/Releases/0.1.7/VocabularyManager_0.1.7.zip/download</a>

<h3>Notes</h3>

-Currently runs only on Windows.

-Trying to load large lift files that don't already have a config file generated tends to be slow and may hang. It has to do with the way the language tags for fields are found. If a config file already exists, the file loads more quickly. Generation of config files for smaller lift files works better but is still slow.

<h4><a href="#change-log">See Change Log</a></h4>

<h3>Installation</h3>
After downloading, unzip the archive to its own folder (for example, C:\Program Files(x86)\VocabularyManager\ on Windows).
Optionally, create a short cut for you start menu or desktop.

<h3>Running the program</h3>
Double-click the file VocabularyManager.exe or the shortcut you created to start.

<h3>How to use</h3>
The program needs a lift project exported from either Fieldworks Language Explorer or WeSay. Words, pictures, and sound files should be added in those programs and saved or exported.

Once the lift project has been created, run Vocabulary Manager. If it is the first time you have run the program, a open file dialog box will be displayed. Find the lift file that you want to use and click open. Importing the file may take sometime. If a warning about a script not responding appears, choose to continue running the script.

The Vocabulary Manager window has two panels.

On the left, a list of all of the entries from the lift file is displayed. These can be used to make flashcards (which will be displayed in the right panel). You can show more fields by clicking the options button and adding more columns to display. Click on a column header will sort by that column. The textboxes below the column headers let you filter the entries shown. Clicking on a row in the entry panel will display more details about the entry.

On the right, there is a list of flashcards organized into decks. The list will be empty when you first create the project. There are two methods to create new cards:

<strong>Method 1:</strong> Drag an entry from the panel on the left and drop it onto the deck. Currently it is only possible to drag one entry at a time.
<strong>Method 2:</strong> Select entries using the checkboxes on the left. Click on the deck that you want to add the new cards to (clicking on the name of the deck will highlight it). Click "Add Entries".

After cards have been added to a deck, they can be customized depending on what data is in the entry. If the entry that the card refers to has multiple senses, glosses, definitions, or example sentences, these will be listed in the drop down menu next to the name of the card. The card can only refer to one of these, so choose which one you want it to. If you want to include multiple senses, etc from the entry, then create another card from that entry.

You can also choose what sound or picture file is associated with a card by clicking the Edit button that is displayed when hovering over a card. Fieldworks and WeSay only allow you to put sound files at the entry level, so if you want different sound files for example sentence or different senses, add them in one of those programs and select the appropriate one from the drop down in Vocabulary Manager. Picture files are stored at the sense level, so it's easy to have one per sense, but if you want to have one picture for a gloss/definition and another for an example sentence, you'll have to choose it from the drop down. By default, the first audio file and picture file are chosen, if present.

To use the flashcards, select the deck(s) you want to use by checking the box beside the deck's name, then click "Practice". There are three modes, "Association", "Comprehension", and "Spellling".

<h4>Association</h4>
The cards will be displayed one at a time so you can become familiar with them. Once you start, the card will be displayed and the sound file (if present) will be played. To play the sound again, click the play button. You can move to the next card by clicking "Next". Glosses can be displayed or hidden.

<h4>Comprehension</h4>
Cards will be displayed in groups (four, by default). The written form of one card will be displayed, and the associated sound file (if present) will be played. You will need to click on the card that corresponds to the word given. After clicking, Vocabulary Manager will indicate if you were right or wrong. Click "Next" to move on to the next card.

<h4>Spelling</h4>
One card will be display at a time. The sound file will be played as prompt for you to write the word. Glosses can also be displayed to help. After typing the word, click "Check", and the answer will be displayed. Click Next to move on to the next word.

<h3>Other options</h3>
- By default, Vocabulary Manager automatically saves changes to project settings and flashcards. This can be disable in the Options window.
- It's possible that more than one vernacular or analysis languages were defined in Fieldworks Language Explorer or WeSay. Vocabulary manager adds new flashcards according the language at the top of those list in the options window.

<h3 id="changelog">Change Log</h3>

<h4 id="v0.1.7">Version 0.1.6</h4>
<h5>Bug fixes</h5>
- In version 0.1.6, the buttons to move writing system languages up or down in preference stopped working. The functionality has been restored.

<h4 id="v0.1.6">Version 0.1.6</h4>
<h5>New Features</h5>
- <strong>Automatic keyboard switching on windows.</strong> Several input fields will now automatically switch the active language/keyboard as defined in the writing system definitions exported by Fieldworks and WeSay. The keyboards but be installed on the system.

<h5>Bug fixes</h5>
- If a project saved in history was moved to another location, Vocabulary Manager would crash when trying to open it at the old location. It now offers an open file dialog to find the file or another one. If the user cancels the dialog, the program will close.
- Sub-decks were not being saved at all. Now they are.

<h5>Outstanding bugs</h5>
- Long load times for large lift files that do not have project configuration files.
- The Spelling mode does not match combined and composite unicode characters.
- Variant entries from Fieldworkds or WeSay are not supported yet.

<h5>Other changes</h5>
- The Options dialog is now a real window that can be moved and re-sized.
- Language names are now displayed instead of language codes in the Options window.
- The Practice window now resets each time it is opened.
- The last Practice mode used is now saved in the project configuration file so that it will be displayed by default the next time the project is opened.

VocabLift
=================

Language-learning tool that uses vocabulary from <a href="https://code.google.com/p/lift-standard/">LIFT-format</a> dictionaries produced by programs such as <a href="http://fieldworks.sil.org/">Fieldworks Language Explorer</a> and <a href="http://wesay.palaso.org/">WeSay</a>.

<h3>Download</h3>
<strong><a href="http://sourceforge.net/projects/vocablift/files/Releases/0.3.0/VocabLift-Setup-0.3.0.exe/download">Version 0.3.0</a>:</strong> Available on SourceForge at <a href="http://sourceforge.net/projects/vocablift/files/Releases/0.3.0/VocabLift-Setup-0.3.0.exe/download">http://sourceforge.net/projects/vocablift/files/Releases/0.3.0/VocabLift-Setup-0.3.0.exe/download</a>

<h4>New in version 0.3.0</h4>
- *If upgrading from a version previous to 0.3.0, is recommended that you delete your project's config file. If you use picture or audio files, you may need to manually change the paths to these files for every card in the .decks file.
- Added support for translation of the UI. Currently English and Spanish are supported.
- Added an setup program for Windows.
- Redesigned card editing interface.
- It is now possible to create cards not based on dictionary entries.
- When creating a new card, VocabLift will search for picture and audio files in the pictures and audio folders of the project that match the value of Side 2 of the card. If a match is found, the file is associated to the card. Files can still be added or removed manually. Currently this ignores diacritics.
- Added flash card practice mode.
- Comprehension and spelling practice modes now keep track practices sessions. Sessions can be viewed and deleted in the Statistics window. Statistics for individual cards can also be viewed.
- Comprehension and spelling practice modes now allow you to set the number of attempts before an answer is marked incorrect.
- Spelling practice mode now allows you to ignore diacritics if desired.
- The lift-ranges file produced by Language Explorer is no longer loaded (this should improve start up time).
- Optionally prompt for save after editing a card.
- Optionally prompt for save when closing VocabLift or opening another lift project.
- VocabLift now uses the fonts specified in the Writing Systems files produced by Language Explorer and WeSay if they are installed on the system.
- Fixed bugs in Writing System imports.
- Fixed bugs in dictionary filters.
- Fixed bugs when selecting on a child deck without selecting its parent.
- Fixed various other bugs.

- VocabLift now runs using <a href="https://github.com/rogerwang/node-webkit">node-webkit</a> 0.7.5. The following node modules are needed to run: fs-extra and semver.

<h5><a href="#change-log">See the change log</a></h5>

<h3>Notes</h3>

- Currently runs only on Windows.

- Trying to load large lift files that don't already have a config file generated tends to be slow and may hang. It has to do with the way the language tags for fields are found. If a config file already exists, the file loads more quickly. Generation of config files for smaller lift files works better but is still slow.

<h3>Installation</h3>
After downloading, run the setup program.
Optionally, create a shortcut for your start menu or desktop.

<h3>Running the program</h3>
Double-click the file or shortcut you created to start.

<h3>How to use</h3>
The program needs a lift project exported from either Fieldworks Language Explorer or WeSay.

*When exporting from Fieldworks Language Explorer, make sure to choose either Full Lexicon (LIFT 0.13 XML) or Filtered Lexicon (LIFT 0.13 XML). VocabLift needs that are exported only by these methods, and it will not work if you use another export method.

Words, pictures, and sound files should be added in those programs and saved or exported.

Once the lift project has been created, run VocabLift. If it is the first time you have run the program, a open file dialog box will be displayed. Find the lift file that you want to use and click open. Importing the file may take sometime. If a warning about a script not responding appears, choose to continue running the script.

The VocabLift window has two panels.

On the left, a list of all of the entries from the lift dictionary file is displayed. These can be used to make flashcards (which will be displayed in the right panel). You can show more fields by clicking the options button and adding more columns to display. Click on a column header will sort by that column. The textboxes below the column headers let you filter the entries shown. Clicking on a row in the entry panel will display more details about the entry.

On the right, there is a list of flashcards organized into decks. The list will be empty when you first create the project. There are multiple methods to create new cards:

<h4>Creating cards from dictionary entries</h4>
<strong>1:</strong> Drag an entry from the panel on the left and drop it onto the deck. Currently it is only possible to drag one entry at a time.
<strong>2:</strong> Select entries using the checkboxes on the left. Click on the deck that you want to add the new cards to (clicking on the name of the deck will highlight it). Click "Add Entries".

<h4>Creating new cards not based on dictionary entries</h4>
Click the "Create New Card" button and enter information for Side 1 and Side 2 in the pop up window that shows. If matching dictionary entries are found, VocabLift will recommend that you create the new card based on the entry, but it is not necessary to do so.

After cards have been added to a deck, they can be customized depending on what data is in the entry. If the entry that the card refers to has multiple senses, glosses, definitions, or example sentences, these will be listed in the drop down menu when clicking on "Choose from predefined card options". The card can only refer to one of these, so choose which one you want it to. If you want to include multiple senses, etc from the entry, then create another card from that entry.

<h5>Editing cards</h5>
You can also choose what sound or picture file is associated with a card by clicking the Edit button that is displayed in the card editing area.

Fieldworks and WeSay only allow you to put sound files at the entry level, so if you want different sound files for example sentence or different senses, add them in one of those programs and select the appropriate one from the drop down in VocabLift. Picture files are stored at the sense level, so it's easy to have one per sense, but if you want to have one picture for a gloss/definition and another for an example sentence, you'll have to choose it from the drop down. By default, the first audio file and picture file are chosen, if present. As of version 0.1.9, you can add picture and audio files to a card that are not referred to in the LIFT file. These changes will only be reflected in the card. They will not be reflected in the LIFT file.

You can also make arbitrary cards based on an entry in the LIFT file. You can edit both sides of the card and the picture and audio files associated with it. No changes will be made to the LIFT file.

To use the flashcards, select the deck(s) you want to use by checking the box beside the deck's name, then click "Practice". There are four modes, "Association", "Flash Cards", "Comprehension", and "Spelling".

<h4>Association</h4>
The cards will be displayed one at a time so you can become familiar with them. Once you start, the card will be displayed and the sound file (if present) will be played. To play the sound again, click the play button. You can move to the next card by clicking "Next". Glosses can be displayed or hidden.

<h4>Flash Cards</h4>
This mode displays simple flashcards without pictures. You can choose to show side 1 or side 2 first.

<h4>Comprehension</h4>
Cards will be displayed in groups (four, by default). The written form of one card will be displayed, and the associated sound file (if present) will be played. You will need to click on the card that corresponds to the word given. After clicking, VocabLift will indicate if you were right or wrong. Depending on the number of attempts you've allowed yourself, you will be able to try again. Click on an item after the maximum number of attempts has been reached will advance to the next set. Click "Next" to move on to the next set at anytime.

<h4>Spelling</h4>
One card will be display at a time. The sound file will be played as prompt for you to write the word. Glosses can also be displayed to help. After typing the word, click "Check" or press enter, and the answer will be displayed. Press Enter or click Next to move on to the next word.

<h3>Other options</h3>
- By default, VocabLift automatically saves changes to project settings and flashcards. This can be disable in the Options window.
- It's possible that more than one vernacular or analysis languages were defined in Fieldworks Language Explorer or WeSay. VocabLift adds new flashcards according the language at the top of those list in the options window.

<h3 id="changelog">Change log</h3>
<h4>New in version 0.3.0</h4>
- *If upgrading from a version previous to 0.3.0, is recommended that you delete your project's config file. If you use picture or audio files, you may need to manually change the paths to these files for every card in the .decks file.
- Added support for translation of the UI. Currently English and Spanish are supported.
- Added an setup program for Windows.
- Redesigned card editing interface.
- It is now possible to create cards not based on dictionary entries.
- When creating a new card, VocabLift will search for picture and audio files in the pictures and audio folders of the project that match the value of Side 2 of the card. If a match is found, the file is associated to the card. Files can still be added or removed manually. Currently this ignores diacritics.
- Added flash card practice mode.
- Comprehension and spelling practice modes now keep track practices sessions. Sessions can be viewed and deleted in the Statistics window. Statistics for individual cards can also be viewed.
- Comprehension and spelling practice modes now allow you to set the number of attempts before an answer is marked incorrect.
- Spelling practice mode now allows you to ignore diacritics if desired.
- The lift-ranges file produced by Language Explorer is no longer loaded (this should improve start up time).
- Optionally prompt for save after editing a card.
- Optionally prompt for save when closing VocabLift or opening another lift project.
- VocabLift now uses the fonts specified in the Writing Systems files produced by Language Explorer and WeSay if they are installed on the system.
- Fixed bugs in Writing System imports.
- Fixed bugs in dictionary filters.
- Fixed bugs when selecting on a child deck without selecting its parent.
- Fixed various other bugs.

- VocabLift now runs using <a href="https://github.com/rogerwang/node-webkit">node-webkit</a> 0.7.5. The following node modules are needed to run: fs-extra and semver.

<h4 id="v0.2.0">Version 0.2.0</h4>
- Initial support for variant entries.
- Name changed to VocabLift
- Column sort info is now loaded when the project is opened

<h4 id="v0.1.9">Version 0.1.9</h4>
<h5>New features</h5>
- Added the ability to create arbitrary cards based on an entry.

<h5>Bug fixes</h5>
- Filters and spelling became case-sensitive in version 0.1.8; they are now case-insensitive again.

<h5>Outstanding bugs</h5>
- Long load times for large lift files that do not have project configuration files.
- Variant entries from Fieldworks or WeSay are not supported yet.
- Column sorting information is saved in the project configuration file but not triggering default sorting when the project is opened.

<h4 id="v0.1.8">Version 0.1.8</h4>
<h5>Bug fixes</h5>
- Filters for the entry table and the input for the Spelling practice now match on both precomposed and decomposed Unicode characters.
- Fixed a bug that where having a malformed pronunciation element in an entry in the lift file would prevent cards from being created from that entry and prevent Quick Practice from loading such entries.
- Fixed a bug preventing the importing of writing system definition files with rules.

<h5>Outstanding bugs</h5>
- Long load times for large lift files that do not have project configuration files.
- Variant entries from Fieldworks or WeSay are not supported yet.
- Column sorting information is saved in the project configuration file but not triggering default sorting when the project is opened.

<h5>Other changes</h5>
- Cosmetic changes to the options window and deck panel.
- Upgraded ng-grid component to version 2.0.2

<h4 id="v0.1.7">Version 0.1.7</h4>
<h5>Bug fixes</h5>
- In version 0.1.6, the buttons to move writing system languages up or down in preference stopped working. The functionality has been restored.

<h4 id="v0.1.6">Version 0.1.6</h4>
<h5>New features</h5>
- <strong>Automatic keyboard switching on windows.</strong> Several input fields will now automatically switch the active language/keyboard as defined in the writing system definitions exported by Fieldworks and WeSay. The keyboards but be installed on the system.

<h5>Bug fixes</h5>
- If a project saved in history was moved to another location, VocabLift would crash when trying to open it at the old location. It now offers an open file dialog to find the file or another one. If the user cancels the dialog, the program will close.
- Sub-decks were not being saved at all. Now they are.

<h5>Outstanding bugs</h5>
- Long load times for large lift files that do not have project configuration files.
- The Spelling mode does not match combined and composite unicode characters.
- Variant entries from Fieldworks or WeSay are not supported yet.

<h5>Other changes</h5>
- The Options dialog is now a real window that can be moved and re-sized.
- Language names are now displayed instead of language codes in the Options window.
- The Practice window now resets each time it is opened.
- The last Practice mode used is now saved in the project configuration file so that it will be displayed by default the next time the project is opened.

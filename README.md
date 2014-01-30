VocabLift
=================

Language-learning tool that uses vocabulary from <a href="https://code.google.com/p/lift-standard/">LIFT-format</a> dictionaries produced by programs such as <a href="http://fieldworks.sil.org/">Fieldworks Language Explorer</a> and <a href="http://wesay.palaso.org/">WeSay</a>.

<h3>Download</h3>
<strong><a href="http://sourceforge.net/projects/vocablift/files/Releases/0.3.1/VocabLift-Setup-0.3.1.exe/download">Version 0.3.1</a>:</strong> Available on SourceForge at <a href="http://sourceforge.net/projects/vocablift/files/Releases/0.3.1/VocabLift-Setup-0.3.1.exe/download">http://sourceforge.net/projects/vocablift/files/Releases/0.3.1/VocabLift-Setup-0.3.1.exe/download</a>

<h3>Requirements</h3>
As of version 0.3.1, DirectX is required for the Memory game to function correctly.

<h4>New in version 0.3.1</h4>
- Added new games (Dirty Dozen, Matching, and Memory).
- Added a search/filter component for the card list.
- Several interface and filter bugs were fixed.

<h5><a href="changelog.MD">See the change log</a></h5>

<h3>Notes</h3>

- Currently runs only on Windows 7 or higher.

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

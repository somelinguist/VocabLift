<h1>Change log</h1>

<h4 id="v0.3.2">New in version 0.3.2</h4>
- Initial support for custom fields defined in Fieldworks Language Explorer.
- Blank new cards can now be created. Cards that have a blank side 1 will not be used in certain practice games (Flashcard, Spelling).
- Cards within a deck that are related to dictionary entries can now be mass-updated to use a predefined field from the dictionary if present (available through the deck edit window).
- Changes to cards are now saved automatically if the project is set to save automatically.
- Decks can be duplicated by holding the Ctrl key when dragging.
- The arrow keys can be used to advance or go back in the Flashcard game.
- Various bug fixes.

<h4 id="v0.3.1">New in version 0.3.1</h4>
- Added new matching memory card games.
- Added a search/filter component for the card list.
- Several interface and filter bugs were fixed.

<h4 id="v0.3.0">New in version 0.3.0</h4>
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

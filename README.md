# Google Adwords Negative Keyword Generator

## Context

Inspired from Jonathan Dane's article [19 Reasons Why Single Keyword Ad Groups (SKAGs) Always Win](https://klientboost.com/ppc/single-keyword-ad-groups/), I decided to build a tool that would help me eliminate all similar ad groups from competing from each other.

The key paragraphs from Dane's article are:

> Now, once that new SKAG (let’s call it – “Custom Made Glitter Speedos”) is created from the search term report of the “Custom Made Speedos” SKAG, you’ll want to make sure that ‘glitter’ is an ad group level negative keyword to your original “Custom Made Speedos” SKAG.

and

> Then, you’ll simply add those search terms as ad group level negative keywords (to eliminate internal competition) and your performance will continue to improve over time because your new SKAGs have more specific ads which leads to higher CTRs.

I don't trust myself to do this manually, so I've written a node script to take an input CSV and produce an output CSV. Easy.

## Requirements

All you need is Node JS.

## How to use this package

Clone the repository or download the zip.

CD into the folder with this source code.

Add a file called `keywords.csv` into the project directory. This file should be a csv in the format of `campaign,adgroup`. You should be able to extract this file from the Adwords editor.

Then simply run `npm start` from your command line. This will output a `negative-keywords.csv` file that you can inport back into Adwords editor that will automatically apply all the updates.

Open any Github issues if you have problems working with this script.

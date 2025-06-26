/* eslint-disable no-console */

import { readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import 'dotenv/config';
import GhostAdminAPI from '@tryghost/admin-api';

const STAGING = 'staging';
const PRODUCTION = 'production';

const clientStaging = new GhostAdminAPI({
    url: process.env.STAGING_API_URL,
    key: process.env.STAGING_API_KEY_ADMIN,
    version: 'v5.126.0',
});

const clientProduction = new GhostAdminAPI({
    url: process.env.PRODUCTION_API_URL,
    key: process.env.PRODUCTION_API_KEY_ADMIN,
    version: 'v5.126.0',
});

const getPages = (target) => {
    const normalizedTarget = target.toLowerCase();
    const client =
        normalizedTarget === STAGING ? clientStaging : clientProduction;
    const dataPath = join(process.cwd(), `tmp/${normalizedTarget}.json`);
    const settingsPath = join(process.cwd(), 'config/settings.json');
    const settings = JSON.parse(readFileSync(settingsPath));
    const targetSlugs = settings.slugs.join(',');

    console.log(`Fetching data from ${normalizedTarget} ...\n\n`);

    return new Promise((resolve, reject) => {
        client.pages
            .browse({ filter: `slug:[${targetSlugs}]`, limit: 1000 })
            .then((pages) => {
                const jsonString = `{ "pages": ${JSON.stringify(pages)} }`;
                writeFileSync(dataPath, jsonString, { flag: 'a' });
                resolve();
            })
            .catch((e) => reject(e));
    });
};

const cleanTmpFile = (target) => {
    const relativePath = `tmp/${target.toLowerCase()}.json`;

    console.log(`Removing "${relativePath}"...\n\n`);
    rmSync(join(process.cwd(), relativePath));
};

const moveToProduction = () => {
    const stagingDataPath = join(process.cwd(), 'tmp/staging.json');
    const stagingData = JSON.parse(readFileSync(stagingDataPath)).pages;

    console.log(`Adding page copies from ${STAGING} to ${PRODUCTION}...\n\n`);

    return new Promise((resolve) => {
        stagingData.forEach((stagingPage) => {
            clientProduction.pages.add({
                lexical: stagingPage.lexical,
                status: 'published',
                title: stagingPage.title,
                published_at: stagingPage.published_at,
            });
            resolve();
        });
    });
};

getPages(STAGING).then(() => {
    moveToProduction().then(() => {
        cleanTmpFile(STAGING);
    });
});

This is a React.js project using Next.js.

#Project Information
丹尼爾是⼀名⼯程師，他過往學⼀些⼈使⽤ GitHub Issue 來充當⾃⼰的部落格。他已使⽤ GitHub Issue 寫部落格⼀段時間，但發
現這樣做有些明顯的缺點，不只是顯⽰上⽐較侷限，⽂章也⽐較不容易被搜尋引擎排到前⾯。因此他決定串接 GitHub API 並使⽤
React.js 開發⼀個網⾴，讓搜尋引擎更容易尋找到他在 GitHub Issue 上寫出的⽂章，並調整成⾃⼰喜歡的樣式，希望熟悉前端的
你能幫助他完成這個專案。

#Fundamental Requirements 
1. Use React.js and Next.js
2. Use Git and Github
3. Explain the project through a README.md

##To Add Points
<s>1. Use Typescript</s>
2. Use Next.js + App Router
3. Check the score on Web Vitals
4. Implement Error Handling
5. Deploy it

#Project Structure



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Explanation

Project was built using Next.js without Typescript. In my opinion, it would have been better to use Typescript but I wasn't sure to use it or not. 

Project uses Next.auth to authenticate users and give certain permissions such as `create a new issue` or `update an issue`. The data comes from Github Issues through Github API. I created my TOKEN to connect to the Github API and I used [Octokit](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-2) as the Github documentation suggests.

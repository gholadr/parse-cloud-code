parse-cloud-code
================

adding some data scrubbing code

run this curl command to run the function

curl -X POST \
  -H "X-Parse-Application-Id: TkYE0E4ye4QniJS2HMmsdKlCuAVl2GyvgN02vR9A" \
  -H "X-Parse-Master-Key: wqauc5Subiv7KGL5NSm7ys004IAalBrKBWiXtqId" \
  -H "Content-Type: application/json" \
  -d '{"bogus":"bogus"}' \
  https://api.parse.com/1/jobs/channelDataScrub

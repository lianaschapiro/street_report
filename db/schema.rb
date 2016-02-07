# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160207162449) do

  create_table "comments", force: :cascade do |t|
    t.string   "body"
    t.string   "name"
    t.boolean  "flag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "report_id"
  end

  add_index "comments", ["report_id"], name: "index_comments_on_report_id"

  create_table "reports", force: :cascade do |t|
    t.string   "title"
    t.string   "body"
    t.float    "Lat"
    t.float    "Lng"
    t.boolean  "catcall"
    t.boolean  "stalking"
    t.boolean  "threat"
    t.boolean  "touching"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.boolean  "mean_comments"
    t.boolean  "exposure"
    t.boolean  "assault"
    t.boolean  "rape"
    t.boolean  "group"
    t.boolean  "gestures"
    t.boolean  "takingphotos"
    t.string   "address"
    t.boolean  "flag_report"
    t.datetime "incident_date"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.boolean  "admin"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end

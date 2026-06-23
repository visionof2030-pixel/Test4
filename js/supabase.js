// ===== MODULE: supabase.js =====
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = "https://szjxwhsmefqpfcebtvei.supabase.co";
const SUPABASE_KEY = "sb_publishable_0um28lgPMHcjDOThT0UgDA_K-Y7Wmx3";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchPredictions(limit = 500) {
    const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .limit(limit);
    if (error) throw error;
    return data || [];
}

export async function insertPrediction(prediction) {
    const { data, error } = await supabase
        .from("predictions")
        .insert([prediction]);
    if (error) throw error;
    return data;
}

export async function updatePrediction(id, updates) {
    const { data, error } = await supabase
        .from("predictions")
        .update(updates)
        .eq("id", id);
    if (error) throw error;
    return data;
}

export async function fetchUserPredictions(userName) {
    const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_name", userName)
        .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
}

export async function fetchMatchPredictions(matchId) {
    const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("match_id", matchId)
        .order("created_at", { ascending: true });
    if (error) throw error;
    return data || [];
}

export async function checkUserNameExists(userName) {
    const { data, error } = await supabase
        .from("predictions")
        .select("user_name")
        .eq("user_name", userName)
        .limit(1);
    if (error) throw error;
    return data && data.length > 0;
}

export async function archivePredictions(predictions) {
    const archiveData = predictions.map(p => ({
        ...p,
        archived_at: new Date().toISOString()
    }));
    const { data, error } = await supabase
        .from("archive_predictions")
        .insert(archiveData);
    if (error) throw error;
    return data;
}

export async function fetchArchive() {
    const { data, error } = await supabase
        .from("archive_predictions")
        .select("*")
        .order("archived_at", { ascending: false });
    if (error) throw error;
    return data || [];
}

export async function deleteAllPredictions() {
    const { error } = await supabase
        .from("predictions")
        .delete()
        .neq("id", 0);
    if (error) throw error;
    return true;
}

export async function fetchAllUserPredictions(userName) {
    return fetchUserPredictions(userName);
}